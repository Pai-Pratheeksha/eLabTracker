const Submission = require('../models/Submission');
const Experiment = require('../models/Experiment');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

// POST /api/submissions/:experimentId - Submit record (student)
exports.submitRecord = async (req, res) => {
  const { experimentId } = req.params;
  const studentId = req.user.userId || req.user.id || req.user._id;

  try {
     // debug req.file presence and keys
    console.log('req.file =', req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer ? req.file.buffer.length : 0
    } : null);

     // 1) make sure upload middleware actually ran
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'File upload failed' });
    }

    // 2) Check if experiment exists
    const experiment = await Experiment.findById(experimentId);
    if (!experiment) {
      return res.status(404).json({ message: 'Experiment not found' });
    }

    // 3) grab the URL that multer-Cloudinary gave us
    // const fileUrl = req.file.path;  // e.g. https://res.cloudinary.com/.../report1.pdf

    // 4) save submission
    const newSubmission = new Submission({
      experiment: experimentId,
      student: studentId,
      // fileUrl,
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype || 'application/pdf',
        fileName: req.file.originalname,
        size: req.file.size,
      },
      status: 'submitted',
    });

    await newSubmission.save();

    // 4) respond (omit file buffer in response for performance)
    const responseSubmission = {
      _id: newSubmission._id,
      experiment: newSubmission.experiment,
      student: newSubmission.student,
      comments: newSubmission.comments,
      grade: newSubmission.grade,
      status: newSubmission.status,
      createdAt: newSubmission.createdAt,
    };

    res.status(201).json({ message: 'Submission successful', submission: responseSubmission });
  } catch (err) {
    console.error('submitRecord error:', err);
    res.status(500).json({ message: 'Submission failed' });
  }
};

// GET /api/submissions/my - Get student's own submissions
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.userId })
      .populate('experiment', 'title')
      .populate('student', 'name email')
      .select('-file'); // IMPORTANT: do not return file buffer here

    res.status(200).json(submissions);
  } catch (err) {
    console.error('getMySubmissions error:', err);
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

// GET /api/submissions/experiment/:experimentId - Faculty view submissions
exports.getExperimentSubmissions = async (req, res) => {
  const { experimentId } = req.params;

  try {
    const submissions = await Submission.find({ experiment: experimentId })
      .populate('student', 'name email')
      .select('-file'); // do not include buffer

    res.status(200).json(submissions);
  } catch (err) {
    console.error('getExperimentSubmissions error:', err);
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

// PUT /api/submissions/:id - Faculty update feedback/grade/status
exports.gradeSubmission = async (req, res) => {
  const { id } = req.params;
  const { comments, grade, status } = req.body;

  try {
    const updated = await Submission.findByIdAndUpdate(
      id,
      { comments, grade, status },
      { new: true }
    ).select('-file'); // optional: omit file in response

    res.status(200).json({ message: 'Submission updated', updated });
  } catch (err) {
    console.error('gradeSubmission error:', err);
    res.status(500).json({ message: 'Failed to update submission' });
  }
};

// GET /api/submissions/file/:submissionId - returns file (protected)
exports.getSubmissionFile = async (req, res) => {
  try {
    const { submissionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).send('Invalid submission id');
    }

    const submission = await Submission.findById(submissionId).select('file');

    if (!submission || !submission.file || !submission.file.data) {
      return res.status(404).send('File not found');
    }

    const { data, contentType, fileName } = submission.file;

    res.set('Content-Type', contentType || 'application/pdf');
    // inline will open in browser; attachment will force download
    res.set('Content-Disposition', `inline; filename="${fileName}"`);
    return res.send(data);
  } catch (err) {
    console.error('getSubmissionFile error:', err);
    return res.status(500).send('Server error');
  }
};

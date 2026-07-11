const Submission = require('../models/Submission');
const Experiment = require('../models/Experiment');
const Lab = require('../models/Lab');
const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandler');

const validStatuses = ['submitted', 'approved', 'needs revision'];

// POST /api/submissions/:experimentId - Submit record (student)
exports.submitRecord = asyncHandler(async (req, res) => {
  const { experimentId } = req.params;
  const studentId = req.user.userId || req.user.id || req.user._id;

  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  const experiment = await Experiment.findById(experimentId);
  if (!experiment) {
    return res.status(404).json({ message: 'Experiment not found' });
  }

  const existingSubmission = await Submission.findOne({
    experiment: experimentId,
    student: studentId,
  });

  if (existingSubmission) {
    return res.status(409).json({ message: 'You have already submitted for this experiment' });
  }

  const newSubmission = await new Submission({
    experiment: experimentId,
    student: studentId,
    file: {
      data: req.file.buffer,
      contentType: req.file.mimetype || 'application/pdf',
      fileName: req.file.originalname,
      size: req.file.size,
    },
    status: 'submitted',
  }).save();

  const responseSubmission = {
    _id: newSubmission._id,
    experiment: newSubmission.experiment,
    student: newSubmission.student,
    comments: newSubmission.comments,
    grade: newSubmission.grade,
    status: newSubmission.status,
    createdAt: newSubmission.createdAt,
  };

  return res.status(201).json({ message: 'Submission successful', submission: responseSubmission });
});

// GET /api/submissions/my - Get student's own submissions
exports.getMySubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ student: req.user.userId })
    .populate('experiment', 'title')
    .populate('student', 'name email')
    .select('-file');

  return res.status(200).json(submissions);
});

// GET /api/submissions/experiment/:experimentId - Faculty view submissions
exports.getExperimentSubmissions = asyncHandler(async (req, res) => {
  const { experimentId } = req.params;

  const experiment = await Experiment.findById(experimentId);
  if (!experiment) {
    return res.status(404).json({ message: 'Experiment not found' });
  }

  const submissions = await Submission.find({ experiment: experimentId })
    .populate('student', 'name email')
    .select('-file');

  return res.status(200).json(submissions);
});

// PUT /api/submissions/:id - Faculty update feedback/grade/status
exports.gradeSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comments, grade, status } = req.body;

  const submission = await Submission.findById(id);
  if (!submission) {
    return res.status(404).json({ message: 'Submission not found' });
  }

  const experiment = await Experiment.findById(submission.experiment);
  if (!experiment) {
    return res.status(404).json({ message: 'Experiment not found' });
  }

  const lab = await Lab.findById(experiment.lab);
  if (!lab) {
    return res.status(404).json({ message: 'Lab not found' });
  }

  if (lab.createdBy.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'Access denied. You can only grade submissions for your own labs' });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const updated = await Submission.findByIdAndUpdate(
    id,
    { comments, grade, status },
    { new: true }
  ).select('-file');

  return res.status(200).json({ message: 'Submission updated', updated });
});

// GET /api/submissions/file/:submissionId - returns file (protected)
exports.getSubmissionFile = asyncHandler(async (req, res) => {
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
  res.set('Content-Disposition', `inline; filename="${fileName}"`);
  return res.send(data);
});

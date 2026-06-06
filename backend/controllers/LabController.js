const Lab = require('../models/Lab');
const User = require('../models/User');

// POST /api/labs (faculty only)
exports.createLab = async (req, res) => {
  const { subject, semester } = req.body;
  const userId = req.user.userId;

  try {
    const lab = new Lab({
      subject,
      semester,
      createdBy: userId,
    });

    await lab.save();
    res.status(201).json({ message: 'Lab created successfully', lab });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create lab' });
  }
};

// GET /api/labs
exports.getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find({
    createdBy: req.user.userId
  }).populate('createdBy', 'name email');
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch labs' });
  }
};

exports.getStudentLabs = async (req, res) => {
  try {
    const student = await User.findById(req.user.userId);

    const labs = await Lab.find({
      semester: student.semester
    });

    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch labs'
    });
  }
};

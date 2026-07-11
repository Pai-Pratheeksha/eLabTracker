const Lab = require('../models/Lab');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/labs (faculty only)
exports.createLab = asyncHandler(async (req, res) => {
  const { subject, semester } = req.body;
  const userId = req.user.userId;

  const existingLab = await Lab.findOne({
    subject,
    semester,
    createdBy: userId,
  });

  if (existingLab) {
    return res.status(409).json({ message: 'Lab already exists for this subject and semester' });
  }

  const lab = await new Lab({
    subject,
    semester,
    createdBy: userId,
  }).save();

  return res.status(201).json({ message: 'Lab created successfully', lab });
});

// GET /api/labs
exports.getAllLabs = asyncHandler(async (req, res) => {
  const labs = await Lab.find({ createdBy: req.user.userId }).populate('createdBy', 'name email');

  return res.status(200).json(labs);
});

exports.getStudentLabs = asyncHandler(async (req, res) => {
  const student = await User.findById(req.user.userId);

  if (!student) {
      return res.status(404).json({
          message: "Student not found"
      });
  }

  const labs = await Lab.find({ semester: student.semester });

  return res.status(200).json(labs);
});

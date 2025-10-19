const Lab = require('../models/Lab');

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
    const labs = await Lab.find().populate('createdBy', 'name email');
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch labs' });
  }
};

const Experiment = require('../models/Experiment');
const Lab = require('../models/Lab');
const asyncHandler = require('../middleware/asyncHandler');

const getOwnedLab = async (labId, userId) => {
  const lab = await Lab.findById(labId);

  if (!lab) {
    return { error: { status: 404, message: 'Lab not found' } };
  }

  if (lab.createdBy.toString() !== userId) {
    return { error: { status: 403, message: 'Access denied. You can only add experiments to your own labs' } };
  }

  return { lab };
};

// POST /api/experiments/:labId - Add experiment to lab (faculty only)
exports.createExperiment = asyncHandler(async (req, res) => {
  const { labId } = req.params;
  const { title, aim, procedure } = req.body;
  const userId = req.user.userId;

  const { lab, error } = await getOwnedLab(labId, userId);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  const existingExperiment = await Experiment.findOne({
    lab: lab._id,
    title,
  });

  if (existingExperiment) {
    return res.status(409).json({ message: 'Experiment already exists for this lab' });
  }

  const newExperiment = await new Experiment({
    lab: lab._id,
    title,
    aim,
    procedure,
  }).save();

  return res.status(201).json({ message: 'Experiment created', experiment: newExperiment });
});

// GET /api/experiments/:labId - Get all experiments for a lab
exports.getExperimentsByLab = asyncHandler(async (req, res) => {
  const { labId } = req.params;

  const lab = await Lab.findById(labId);
  if (!lab) {
    return res.status(404).json({ message: 'Lab not found' });
  }

  const experiments = await Experiment.find({ lab: labId });
  return res.status(200).json(experiments);
});

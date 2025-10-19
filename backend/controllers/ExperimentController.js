const Experiment = require('../models/Experiment');

// POST /api/experiments/:labId - Add experiment to lab (faculty only)
exports.createExperiment = async (req, res) => {
  const { labId } = req.params;
  const { title, aim, procedure } = req.body;

  try {
    const newExperiment = new Experiment({
      lab: labId,
      title,
      aim,
      procedure,
    });

    await newExperiment.save();
    res.status(201).json({ message: 'Experiment created', experiment: newExperiment });
  } catch (err) {
    res.status(500).json({ message: 'Error creating experiment' });
  }
};

// GET /api/experiments/:labId - Get all experiments for a lab
exports.getExperimentsByLab = async (req, res) => {
  const { labId } = req.params;

  try {
    const experiments = await Experiment.find({ lab: labId });
    res.status(200).json(experiments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching experiments' });
  }
};

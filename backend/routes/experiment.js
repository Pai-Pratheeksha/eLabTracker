const express = require('express');
const router = express.Router();
const { createExperiment, getExperimentsByLab } = require('../controllers/ExperimentController');
const { protect, isFaculty } = require('../middleware/authMiddleware');

// POST - Create experiment under lab (faculty only)
router.post('/:labId', protect, isFaculty, createExperiment);

// GET - Get experiments for a lab (student/faculty)
router.get('/:labId', protect, getExperimentsByLab);

module.exports = router;

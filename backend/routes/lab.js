const express = require('express');
const router = express.Router();
const { createLab, getAllLabs, getStudentLabs } = require('../controllers/LabController');
const { protect, isFaculty } = require('../middleware/authMiddleware');
const { createLabValidator } = require('../validators/labValidator');
const validate = require('../middleware/validation');

// POST /api/labs - Create a lab (faculty only)
router.post('/', protect, isFaculty, createLabValidator, validate, createLab);

// GET /api/labs - Get all labs (any authenticated user)
router.get('/', protect, getAllLabs);

// GET /api/labs/student - Get labs for the logged-in student
router.get('/student', protect, getStudentLabs);

module.exports = router;

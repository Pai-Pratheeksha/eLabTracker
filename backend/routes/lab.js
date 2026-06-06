const express = require('express');
const router = express.Router();
const { createLab, getAllLabs, getStudentLabs } = require('../controllers/LabController');
const { protect, isFaculty } = require('../middleware/authMiddleware');

// POST /api/labs - Create a lab (faculty only)
router.post('/', protect, isFaculty, createLab);

// GET /api/labs - Get all labs (any authenticated user)
router.get('/', protect, getAllLabs);

// GET /api/labs/student - Get labs for the logged-in student
router.get('/student', protect, getStudentLabs);

module.exports = router;

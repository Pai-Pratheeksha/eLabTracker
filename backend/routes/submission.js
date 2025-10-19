const express = require('express');
const router = express.Router();
const {
  submitRecord,
  getMySubmissions,
  getExperimentSubmissions,
  gradeSubmission,
  getSubmissionFile,
} = require('../controllers/SubmissionController');

const { protect, isFaculty } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Student submits record
router.post('/:experimentId', protect,upload.single('file'), submitRecord);

// Student views own submissions
router.get('/my', protect, getMySubmissions);

// Faculty views all submissions for an experiment
router.get('/experiment/:experimentId', protect, isFaculty, getExperimentSubmissions);

// Faculty updates grade/status
router.put('/:id', protect, isFaculty, gradeSubmission);

// Protected route to stream file buffer
router.get('/file/:submissionId', protect, getSubmissionFile);

module.exports = router;

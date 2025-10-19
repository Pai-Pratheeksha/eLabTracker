const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');

// POST /api/upload/pdf - upload a PDF to Cloudinary
router.post('/pdf', protect, upload.single('file'), (req, res) => {
  try {
    return res.status(200).json({
      message: 'Upload successful',
      fileUrl: req.file.path,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;

const multer = require('multer');
// const { storage } = require('../config/cloudinary');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
});

module.exports = upload;

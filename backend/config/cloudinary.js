const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('./config');

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lab-records',
    format: async () => 'pdf', // force file format
    resource_type: 'raw',  // use 'raw' for non-images like PDFs
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

module.exports = { cloudinary, storage };

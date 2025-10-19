const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  experiment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // fileUrl: {
  //   type: String, // URL to PDF/code file (can use Cloudinary later)
  //   required: true,
  // },

  // New file-in-document fields (Buffer)
  file: {
    data: Buffer,
    contentType: String,
    fileName: String,
    size: Number,
  },

  comments: String,
  grade: String,
  status: {
    type: String,
    enum: ['submitted', 'approved', 'needs revision'],
    default: 'submitted',
  },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

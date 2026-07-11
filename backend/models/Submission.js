const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  experiment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment',
    required: true,
    index: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  // fileUrl: {
  //   type: String, // URL to PDF/code file (can use Cloudinary later)
  //   required: true,
  // },

  // New file-in-document fields (Buffer)
  file: {
    data: Buffer,
    contentType: {
      type: String,
      trim: true,
    },
    fileName: {
      type: String,
      trim: true,
    },
    size: Number,
  },

  comments: {
    type: String,
    trim: true,
  },
  grade: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'needs revision'],
    default: 'submitted',
    trim: true,
    index: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

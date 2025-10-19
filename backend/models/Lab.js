const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Faculty
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lab', labSchema);

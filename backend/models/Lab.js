const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Faculty
    required: true,
    index: true,
  },
}, { timestamps: true });

labSchema.index({ semester: 1 });

module.exports = mongoose.model('Lab', labSchema);

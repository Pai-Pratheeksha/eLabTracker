const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  aim: {
    type: String,
    trim: true,
  },
  procedure: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Experiment', experimentSchema);

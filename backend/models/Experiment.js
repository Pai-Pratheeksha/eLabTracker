const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  aim: String,
  procedure: String,
}, { timestamps: true });

module.exports = mongoose.model('Experiment', experimentSchema);

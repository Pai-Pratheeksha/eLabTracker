const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Do not return password by default
  },
  role: {
    type: String,
    enum: ['student', 'faculty'],
    required: true,
    default: 'student',
    trim: true,
  },
  semester: {
      type: Number,
      min: 1,
      max: 8,
      required: function () {
        return this.role === "student";
      }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

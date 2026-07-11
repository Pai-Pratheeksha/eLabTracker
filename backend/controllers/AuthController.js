const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const asyncHandler = require('../middleware/asyncHandler');

// Register a new user
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role, semester } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
    role,
    semester,
  }).save();

  return res.status(201).json({ message: 'User registered successfully' });
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpire }
  );

  return res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      semester: user.semester,
    },
  });
});

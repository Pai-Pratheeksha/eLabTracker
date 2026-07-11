const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const { register, login } = require('../controllers/AuthController')
const validate = require("../middleware/validation");
const {
  loginValidator,
  registerValidator,
} = require("../validators/authValidator");

// POST /api/auth/register
router.post('/register', registerValidator, validate, register);

// POST /api/auth/login
router.post('/login', loginValidator, validate, login);

router.get("/verify", protect, (req, res) => {
  // authMiddleware already verifies the token
  res.json({ valid: true, role: req.user.role });
});

module.exports = router;

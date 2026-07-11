const { body } = require('express-validator');

const createLabValidator = [
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body("semester")
    .notEmpty()
    .withMessage("Semester is required")
    .isInt({ min: 1, max: 8 })
    .withMessage("Semester must be between 1 and 8")
    .toInt(),
];

module.exports = {
  createLabValidator,
};

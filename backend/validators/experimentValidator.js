const { body } = require('express-validator');

const createExperimentValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('aim')
    .optional()
    .trim(),
  body('procedure')
    .optional()
    .trim(),
];

module.exports = {
  createExperimentValidator,
};

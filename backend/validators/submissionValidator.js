const { body } = require('express-validator');

const updateSubmissionValidator = [
  body('comments')
    .optional()
    .trim(),
  body('status')
    .optional()
    .trim()
    .isIn(['submitted', 'approved', 'needs revision'])
    .withMessage('Status must be one of: submitted, approved, needs revision'),
  body('grade')
    .optional()
    .trim(),
];

module.exports = {
  updateSubmissionValidator,
};

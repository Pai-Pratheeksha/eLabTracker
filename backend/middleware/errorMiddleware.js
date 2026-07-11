const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server Error';

  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File too large. Maximum size is 10 MB';
  } else if (err.message === 'Only PDF files are allowed') {
    statusCode = 400;
    message = 'Only PDF files are allowed. Please upload a PDF report.';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE' || err.code === 'LIMIT_PART_COUNT' || err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_FIELD_KEY' || err.code === 'LIMIT_FIELD_VALUE' || err.code === 'LIMIT_FIELD_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = err.message || 'Invalid upload';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorMiddleware };

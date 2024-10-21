class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware function
const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || 'Internal Server error'; // Default message
  err.statusCode = err.statusCode || 500; // Default status

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Invalid JSON Web Token error
  if (err.name === 'JsonWebTokenError') {
    const message = 'JSON web token is invalid. Try again!';
    err = new ErrorHandler(message, 400);
  }

  // Expired JSON Web Token error
  if (err.name === 'TokenExpiredError') {
    const message = 'JSON web token is expired. Please log in!';
    err = new ErrorHandler(message, 400);
  }

  // Cast error
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map(error => error.message)
        .join(' ')
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

// Exporting using CommonJS
module.exports = {
  errorMiddleware,
  ErrorHandler,
};

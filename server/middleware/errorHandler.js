import config from '../config/config.js';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  // Log error in development
  if (config.env === 'development') {
    console.error(err);
  }

  res.status(status).json({
    status: 'error',
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};
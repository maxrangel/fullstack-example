// Utils
// import { AppError } from '../utils/app-error.util';

import { AppError } from '../utils/app-error.util';

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) Rendered website
  console.error('ERROR', err);

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to the client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // Progamming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);

    // Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) Rendered website
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  // Progamming or other unknown error: don't leak error details
  console.error('ERROR 💥', err);

  // Send generic message

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later.',
  });
};

const handleDuplicateUsernameOrEmail = () => {
  return new AppError('Username and/or email are taken', 400);
};

const handleNotFoundRecord = () => {
  return new AppError('Data not found or removed', 404);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 'P2002') error = handleDuplicateUsernameOrEmail();
    if (error.code === 'P2025') error = handleNotFoundRecord();

    sendErrorProd(error, req, res);
  }
};

export { globalErrorHandler };

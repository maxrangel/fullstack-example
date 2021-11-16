import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Utils
import { catchAsync } from '../utils/catch-async.util';
import { AppError } from '../utils/app-error.util';

export const signupValidators = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

export const validateRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map(error => error.msg)
        .join('. ');

      return next(new AppError(errorMessages, 400));
    }

    next();
  }
);

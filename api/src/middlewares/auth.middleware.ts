import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

// Utils
import { prisma } from '../utils/database.util';
import { AppError } from '../utils/app-error.util';
import { catchAsync } from '../utils/catch-async.util';

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string | number };
    }
  }
}

export const protectSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Getting token and check if it exist
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401)
      );
    }

    // Verification token
    const decoded = (await (promisify<string, jwt.Secret>(jwt.verify)(
      token,
      process.env.JWT_SECRET!
    ) as unknown)) as UserPayload;

    // Check if user still exists
    const currentUser = await prisma.user.findFirst({
      where: { id: +decoded.id, active: true },
    });

    if (!currentUser) {
      return next(
        new AppError('The user belonging to the token no longer exists.', 401)
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  }
);

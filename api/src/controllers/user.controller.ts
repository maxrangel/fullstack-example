import { Request, Response, NextFunction } from 'express';

// Utils
import { prisma } from '../utils/database.util';
import { catchAsync } from '../utils/catch-async.util';
import { AppError } from '../utils/app-error.util';

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({ where: { id: 1 } });

    if (!user) return next(new AppError('No user found', 404));

    res.status(200).json({ status: 'success', data: { user } });
  }
);

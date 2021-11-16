import { Request, Response, NextFunction } from 'express';

// Utils
import { prisma } from '../utils/database.util';
import { catchAsync } from '../utils/catch-async.util';
import { AppError } from '../utils/app-error.util';
import { PasswordHandler } from '../utils/password-handler.util';

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: +id } });

    if (!user) return next(new AppError('No user found', 404));

    res.status(200).json({ status: 'success', data: { user } });
  }
);

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await new PasswordHandler().hashPassword(password);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ status: 'success', data: { newUser } });
  }
);

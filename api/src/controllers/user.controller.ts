import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Utils
import { prisma } from '../utils/database.util';
import { catchAsync } from '../utils/catch-async.util';
import { AppError } from '../utils/app-error.util';
import { PasswordHandler } from '../utils/password-handler.util';

dotenv.config({ path: '.env' });

const signToken = (id: number | string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Validate that the user exists
    const user = await prisma.user.findUnique({ where: { username } });

    if (
      !user ||
      !(await new PasswordHandler().comparePasswords(password, user.password))
    )
      return next(new AppError('Username or password are wrong', 400));

    const token = signToken(user.id);

    const cookieOptions = {
      sameSite: true,
      httpOnly: true,
      expires: new Date(
        Date.now() +
          (+process.env.JWT_COOKIE_EXPIRES_IN! as number) * 24 * 60 * 60 * 1000
      ),
      secure: false,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Only to remove password from response
    user.password = undefined as unknown as string;

    res.status(200).json({ status: 'success', data: { user, token } });
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', 'bye', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
    });
  }
);

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany({
      where: { active: true },
      select: { id: true, username: true, lastSeen: true },
    });

    res.status(200).json({ status: 'success', data: { users } });
  }
);

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
      select: { id: true, username: true },
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ status: 'success', data: { newUser } });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
      body: { username },
    } = req;

    await prisma.user.update({ where: { id: +id }, data: { username } });

    res.status(204).json({ status: 'success' });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await prisma.user.update({ where: { id: +id }, data: { active: false } });

    res.status(204).json({ status: 'success' });
  }
);

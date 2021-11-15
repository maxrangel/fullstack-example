import { Request, Response, NextFunction } from 'express';

import { catchAsync } from '../utils/catch-async.util';

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ status: 'success', data: {} });
  }
);

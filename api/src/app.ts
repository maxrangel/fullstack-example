import express, { Application } from 'express';

// Routers
import { userRouter } from './routes/user.routes';

// Controllers
import { globalErrorHandler } from './controllers/error.controller';

// Utils
import { AppError } from './utils/app-error.util';

const app: Application = express();

// Global middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Routes handlers
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };

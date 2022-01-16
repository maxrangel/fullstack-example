import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import xss from 'xss-clean';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Routers
import { userRouter } from './routes/user.routes';

// Controllers
import { globalErrorHandler } from './controllers/error.controller';

// Utils
import { AppError } from './utils/app-error.util';

const app: Application = express();

// Global middlewares
app.enable('trust proxy');

// Implement CORS
app.use(cors());
app.options('*', cors());

// Data sanitization against XSS
app.use(xss());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

app.use(cookieParser());

// Compress responses
app.use(compression());

// Endpoints
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };

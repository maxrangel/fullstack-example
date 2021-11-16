import express, { Application } from 'express';

// Routers
import { userRouter } from './routes/user.routes';

const app: Application = express();

// Global middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Routes handlers
app.use('/api/v1/users', userRouter);

export { app };

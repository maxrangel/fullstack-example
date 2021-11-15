import express, { Application } from 'express';

const app: Application = express();

// Global middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

export { app };

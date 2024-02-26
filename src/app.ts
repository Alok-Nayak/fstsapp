/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { CompanyRoutes } from './app/modules/company/company.route';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Health Check Route For AWS
app.get('/', (req: Request, res: Response) => {
  console.log('testing');
  res.send('Hello World!');
});

// Application routes
app.use('/api/v1', router);

//global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

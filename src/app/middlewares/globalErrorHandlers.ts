/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const statusCode = 400;
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
    return {
      statusCode,
      message: 'Zod Validation Error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // final response to client
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

export default globalErrorHandler;

/* 
success
message
errorSources: [
  path: '',
  message: '',
]
stack: ''   // only available in development

*/

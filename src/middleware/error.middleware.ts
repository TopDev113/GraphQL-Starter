import { ErrorRequestHandler } from 'express';
import { env } from '@app/config/environment';
import { handleError } from '@app/error-handler/error-handler';

export const errorMiddleware = (): ErrorRequestHandler => (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  const error = handleError(err);

  // All HTTP requests must have a response, so let's send back an error with its status code and message
  res.status(error?.httpStatusCode ?? 500).send({
    message: env.isProduction ? 'Oops! Something went wrong.' : error.message,
    data: env.isProduction ? {} : error,
  });

  next(err);
};

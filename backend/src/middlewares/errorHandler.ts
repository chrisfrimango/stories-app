import { Request, Response, NextFunction } from "express";
import { AppError, isAppError } from "../utils/errors";
import { sendError } from "../utils/responseHandler";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: unknown;

  if (isAppError(err)) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    errors = err;
  }

  if (process.env.NODE_ENV === "development") {
    errors = err.stack;
  }

  sendError(res, message, statusCode, errors);
};

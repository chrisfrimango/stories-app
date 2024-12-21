export type ErrorType =
  | "VALIDATION_ERROR"
  | "AUTH_ERROR"
  | "NOT_FOUND_ERROR"
  | "DATABASE_ERROR"
  | "INTERNAL_ERROR";

export interface AppError extends Error {
  statusCode: number;
  type: ErrorType;
  isOperational: boolean;
}

const createError = (
  message: string,
  statusCode: number,
  type: ErrorType,
  isOperational = true
): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.type = type;
  error.isOperational = isOperational;

  Error.captureStackTrace(error, createError);
  return error;
};

export const createValidationError = (message: string): AppError =>
  createError(message, 400, "VALIDATION_ERROR");

export const createAuthError = (message: string): AppError =>
  createError(message, 401, "AUTH_ERROR");

export const createNotFoundError = (message: string): AppError =>
  createError(message, 404, "NOT_FOUND_ERROR");

export const createDatabaseError = (message: string): AppError =>
  createError(message, 500, "DATABASE_ERROR", false);

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof Error && "type" in error && "statusCode" in error;
};

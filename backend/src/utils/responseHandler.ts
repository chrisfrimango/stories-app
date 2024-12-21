import { Response } from "express";

interface SuccessResponse<T> {
  status: "success";
  data: T;
}

interface ErrorResponse {
  status: "error" | "fail";
  message: string;
  errors?: unknown;
}

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: unknown
): void => {
  const response: ErrorResponse = {
    status: statusCode >= 500 ? "error" : "fail",
    message,
    errors: errors || undefined
  };
  res.status(statusCode).json(response);
};

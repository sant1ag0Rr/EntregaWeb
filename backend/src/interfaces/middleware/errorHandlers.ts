import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";

// Interface middleware: returns a consistent payload for unknown routes.
export function notFoundHandler(_request: Request, response: Response) {
  response.status(404).json({
    success: false,
    message: "Route not found."
  });
}

// Interface middleware: transforms thrown errors into HTTP responses.
export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  }

  return response.status(500).json({
    success: false,
    message: "Internal server error."
  });
}

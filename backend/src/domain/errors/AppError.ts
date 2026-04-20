// Domain error: application rules can throw this; HTTP mapping stays in interfaces.
export class AppError extends Error {
  constructor(message: string, public readonly statusCode = 400) {
    super(message);
    this.name = "AppError";
  }
}

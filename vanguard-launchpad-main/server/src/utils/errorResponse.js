class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const createError = (statusCode, message, details) => new ApiError(statusCode, message, details);

export { ApiError, createError };

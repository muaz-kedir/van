import { ApiError } from "../utils/errorResponse.js";

const notFoundHandler = (_req, _res, next) => {
  next(new ApiError(404, "Resource not found"));
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof ApiError && err.statusCode ? err.statusCode : 500;
  const payload = {
    message: err.message || "Internal server error",
  };

  if (process.env.NODE_ENV !== "production" && err?.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== "production" && err?.stack) {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};

export { notFoundHandler, errorHandler };

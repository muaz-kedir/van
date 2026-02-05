import { ZodError } from "zod";
import { createError } from "../utils/errorResponse.js";

const validateRequest = (schema) => {
  return async (req, _res, next) => {
    try {
      const result = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.validated = result;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        next(createError(400, "Invalid request payload", details));
      } else {
        next(error);
      }
    }
  };
};

export default validateRequest;

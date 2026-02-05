import { z } from "zod";
import isURL from "validator/lib/isURL.js";

const createDesignSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .min(1, "Title is required")
      .max(150, "Title must be 150 characters or fewer"),
    description: z
      .string({ invalid_type_error: "Description must be text" })
      .trim()
      .max(500, "Description must be 500 characters or fewer")
      .optional()
      .or(z.literal("")),
    externalLink: z
      .string({ invalid_type_error: "External link must be text" })
      .trim()
      .optional()
      .refine((value) => !value || isURL(value, { protocols: ["http", "https"], require_protocol: true }), {
        message: "Enter a valid external link (http or https)",
      })
      .or(z.literal("")),
  }),
});

export { createDesignSchema };

import { z } from "zod";
import isURL from "validator/lib/isURL.js";

const createTestimonialSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(1, "Name is required")
      .max(120, "Name must be 120 characters or fewer"),
    role: z
      .string({ required_error: "Role is required" })
      .trim()
      .min(1, "Role is required")
      .max(150, "Role must be 150 characters or fewer"),
    testimonial: z
      .string({ required_error: "Testimonial text is required" })
      .trim()
      .min(10, "Testimonial should be at least 10 characters")
      .max(1000, "Testimonial must be 1000 characters or fewer"),
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

export { createTestimonialSchema };

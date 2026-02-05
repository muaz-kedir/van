import { z } from "zod";
import extractYoutubeId from "../../utils/extractYoutubeId.js";

const baseVideoSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(150, "Title must be 150 characters or less"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or less")
    .optional()
    .or(z.literal("")),
  youtubeUrl: z
    .string({ required_error: "YouTube URL is required" })
    .url("Invalid YouTube URL"),
  isPublished: z.boolean().optional(),
});

const createVideoSchema = z.object({
  body: baseVideoSchema,
});

const idParamSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Video ID is required" }).length(24, "Invalid video ID"),
  }),
});

const updateVideoSchema = z.object({
  params: idParamSchema.shape.params,
  body: baseVideoSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    "At least one property must be provided for update"
  ),
});

const validateYoutubeUrl = (url) => {
  const id = extractYoutubeId(url);
  if (!id) {
    throw new Error("Unable to extract YouTube video ID from the provided URL");
  }
  return id;
};

const getVideoSchema = idParamSchema;
const deleteVideoSchema = idParamSchema;

export { createVideoSchema, updateVideoSchema, getVideoSchema, deleteVideoSchema, validateYoutubeUrl };

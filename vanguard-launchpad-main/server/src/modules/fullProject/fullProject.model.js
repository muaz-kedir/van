import mongoose from "mongoose";

const fullProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    externalLink: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const FullProject = mongoose.model("FullProject", fullProjectSchema);

export default FullProject;

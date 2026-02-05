import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    photoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    testimonial: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    externalLink: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

testimonialSchema.index({ createdAt: -1 });

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;

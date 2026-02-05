import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
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

designSchema.index({ createdAt: -1 });

const DesignItem = mongoose.models.DesignItem || mongoose.model("DesignItem", designSchema);

export default DesignItem;

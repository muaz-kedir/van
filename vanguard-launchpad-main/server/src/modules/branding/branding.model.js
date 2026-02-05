import mongoose from "mongoose";

const brandingSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

brandingSchema.index({ createdAt: -1 });

const BrandingItem = mongoose.models.BrandingItem || mongoose.model("BrandingItem", brandingSchema);

export default BrandingItem;

import mongoose from "mongoose";

const videoProjectSchema = new mongoose.Schema(
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
    youtubeVideoId: {
      type: String,
      required: true,
      trim: true,
      minlength: 11,
      maxlength: 11,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

videoProjectSchema.index({ createdAt: -1 });
videoProjectSchema.index({ isPublished: 1, createdAt: -1 });

const VideoProject =
  mongoose.models.VideoProject || mongoose.model("VideoProject", videoProjectSchema);

export default VideoProject;

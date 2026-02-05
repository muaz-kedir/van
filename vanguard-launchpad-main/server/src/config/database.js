import mongoose from "mongoose";
import env from "../config/env.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("[database] Connected to MongoDB");
  } catch (error) {
    console.error("[database] MongoDB connection error", error);
    throw error;
  }
};

export default connectDatabase;

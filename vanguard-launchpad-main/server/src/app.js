import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import routes from "./routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";
import env from "./config/env.js";
import ensureUploadDir from "./utils/ensureUploadDir.js";

const app = express();
const uploadsDir = path.join(process.cwd(), "uploads");
ensureUploadDir(uploadsDir);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(uploadsDir));

if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

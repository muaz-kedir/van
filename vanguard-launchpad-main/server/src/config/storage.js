import multer from "multer";
import path from "path";
import crypto from "crypto";
import ensureUploadDir from "../utils/ensureUploadDir.js";

const uploadsDir = path.join(process.cwd(), "uploads");
ensureUploadDir(uploadsDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadDir(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const extension = path.extname(file.originalname) || ".jpg";
    cb(null, `${Date.now()}-${uniqueId}${extension}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image uploads are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;

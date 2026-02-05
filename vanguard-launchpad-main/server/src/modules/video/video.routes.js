import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import requireAdmin from "../../middleware/requireAdmin.js";
import validateRequest from "../../middleware/validateRequest.js";
import {
  createVideoSchema,
  updateVideoSchema,
  getVideoSchema,
  deleteVideoSchema,
} from "./video.validation.js";
import {
  createVideoProjectController,
  updateVideoProjectController,
  deleteVideoProjectController,
  getVideoProjectController,
  listPublicVideoProjectsController,
  listAdminVideoProjectsController,
} from "./video.controller.js";

const adminVideoRouter = Router();
const publicVideoRouter = Router();

adminVideoRouter.use(authMiddleware, requireAdmin);

adminVideoRouter
  .route("/")
  .get(listAdminVideoProjectsController)
  .post(validateRequest(createVideoSchema), createVideoProjectController);

adminVideoRouter
  .route("/:id")
  .get(validateRequest(getVideoSchema), getVideoProjectController)
  .patch(validateRequest(updateVideoSchema), updateVideoProjectController)
  .delete(validateRequest(deleteVideoSchema), deleteVideoProjectController);

publicVideoRouter.get("/", listPublicVideoProjectsController);

export { adminVideoRouter, publicVideoRouter };

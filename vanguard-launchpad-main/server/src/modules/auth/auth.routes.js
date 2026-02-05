import { Router } from "express";
import validateRequest from "../../middleware/validateRequest.js";
import { loginSchema } from "./auth.validation.js";
import { loginAdminController } from "./auth.controller.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), loginAdminController);

export default router;

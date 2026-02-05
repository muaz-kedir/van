import asyncHandler from "../../utils/asyncHandler.js";
import { loginAdmin } from "./auth.service.js";

const loginAdminController = asyncHandler(async (req, res) => {
  const {
    body: { email, password },
  } = req.validated;

  const result = await loginAdmin({ email, password });
  res.status(200).json(result);
});

export { loginAdminController };

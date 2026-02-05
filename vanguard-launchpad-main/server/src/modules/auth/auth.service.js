import Admin from "./admin.model.js";
import { createError } from "../../utils/errorResponse.js";
import { signAccessToken } from "../../utils/token.js";

const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw createError(401, "Invalid credentials");
  }

  const isValidPassword = await admin.comparePassword(password);
  if (!isValidPassword) {
    throw createError(401, "Invalid credentials");
  }

  const token = signAccessToken({
    sub: admin.id,
    email: admin.email,
    role: admin.role,
  });

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  };
};

const ensureDefaultAdmin = async ({ email, password, name }) => {
  const existing = await Admin.findOne({ email });
  if (existing) return existing;

  const admin = new Admin({ email, password, name });
  await admin.save();
  return admin;
};

export { loginAdmin, ensureDefaultAdmin };

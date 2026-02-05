import jwt from "jsonwebtoken";
import env from "../config/env.js";

const signAccessToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

export { signAccessToken };

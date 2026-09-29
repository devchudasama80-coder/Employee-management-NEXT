import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const TEMP_SECRET = process.env.JWT_TEMP_SECRET || "fallback_temp_secret_key";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    SECRET,
    { expiresIn: "7d" }
  );
};

export const generateTempToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      twoFactorPending: true,
    },
    TEMP_SECRET,
    { expiresIn: "5m" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

export const verifyTempToken = (token) => {
  return jwt.verify(token, TEMP_SECRET);
};
//utils/token.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// issue access token
export function generateAccessToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    ACCESS_SECRET,
    { expiresIn: "1h", issuer: "cmms-auth-server", audience: "cmms-client" }
  );
}

// issue refresh token
export function generateRefreshToken(user) {
  return jwt.sign(
    { username: user.username, tokenVersion: user.tokenVersion },
    REFRESH_SECRET,
    { expiresIn: "7d", issuer: "cmms-auth-server", audience: "cmms-client" }
  );
}

// verify token (throws if invalid/expired)
export function verifyAccess(token, opts = {}) {
  return jwt.verify(token, ACCESS_SECRET, opts);
}
export function verifyRefresh(token, opts = {}) {
  return jwt.verify(token, REFRESH_SECRET, opts);
}

// hash + compare refresh tokens before saving
export async function hashToken(token) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
}
export async function compareToken(token, hash) {
  return bcrypt.compare(token, hash);
}

// middleware/auth.js
import { verifyAccess } from '../utils/tokens.js';

const rolePermissions = {
  admin: ['dashboard'],
  technician: ['dashboard'],
  supervisor: ['dashboard'],
};

// verify access token from Authorization header
export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token error' });

  const token = parts[1];
  try {
    const decoded = verifyAccess(token); // throws on invalid/expired
    req.user = decoded; // { username, role, iat, exp }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
}

export function allowSection(sectionKey) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) return res.status(401).json({ message: 'No role' });
    const allowed = rolePermissions[req.user.role] || [];
    if (!allowed.includes(sectionKey)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

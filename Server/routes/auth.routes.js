import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefresh,
  hashToken,
  compareToken,
} from '../utils/tokens.js';

const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // store refreshToken hash in DB
  user.refreshTokenHash = await hashToken(refreshToken);
  await user.save();

  // send refresh token as HttpOnly cookie
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ accessToken, role: user.role });
});

// REFRESH
router.post('/refresh', async (req, res) => {
  const token = req.cookies.jid;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = verifyRefresh(token, {
      issuer: 'opms-auth-server',
      audience: 'opms-client',
    });

    const user = await User.findOne({ username: payload.username });
    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({ message: 'User not found' });
    }

    // validate hash
    const valid = await compareToken(token, user.refreshTokenHash);
    if (!valid) return res.status(401).json({ message: 'Invalid refresh token' });

    // rotate refresh token
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshTokenHash = await hashToken(newRefreshToken);
    await user.save();

    res.cookie('jid', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ accessToken, role: user.role });
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid refresh token' });
  }
});

// LOGOUT
router.post('/logout', async (req, res) => {
  const token = req.cookies.jid;
  if (token) {
    const payload = verifyRefresh(token);
    await User.updateOne({ username: payload.username }, { $unset: { refreshTokenHash: 1 } });
  }
  res.clearCookie('jid');
  res.json({ message: 'Logged out' });
});

export default router;

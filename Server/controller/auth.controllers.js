// import User from "../models/User.model.js";
// import jsonwebtoken from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const jwt = jsonwebtoken();

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.json({ token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };



import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { username: user.username, role: user.role, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ accessToken: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

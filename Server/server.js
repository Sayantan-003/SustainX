// server.js
import express from 'express';
import dotenvFlow from 'dotenv-flow';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
// import { verifyToken, allowSection } from './middleware/auth.js';

dotenvFlow.config();
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();
const FRONTEND = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// CORS configuration
app.use(cors({
  origin: FRONTEND,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/solvent', verifyToken, allowSection('solvent'), solventRoutes);
// app.use('/api/prep', verifyToken, allowSection('prep'), prepRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Server startup
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('MongoDB connected successfully');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

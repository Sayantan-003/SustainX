// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenvFlow from "dotenv-flow";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import { verifyToken } from "./middleware/auth.js";
import uploadRoutes from "./routes/upload.routes.js";
import workOrderRoutes from "./routes/WorkOrder.routes.js";
import checklistRoutes from './routes/checklist.routes.js'
import authRoutes from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';


dotenvFlow.config(); // Load .env or .env.development

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =================== Middleware ===================
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// =================== Routes ===================
app.get("/", (req, res) => {
  res.json({ message: "Work Order Management API" });
});

app.use("/api/auth", authRoutes);
app.use("/api", verifyToken, uploadRoutes);
app.use("/api/workorders", verifyToken, workOrderRoutes);
app.use("/api/checklists", verifyToken, checklistRoutes);

// =================== DB + Server Start ===================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to Mongo before starting server
    app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(` Server running in ${process.env.NODE_ENV} mode`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log("=".repeat(50));
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

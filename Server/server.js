// // // server.js
// // import express from 'express';
// // import dotenvFlow from 'dotenv-flow';
// // import connectDB from './config/db.js';
// // import cors from 'cors';
// // import cookieParser from 'cookie-parser';
// // import authRoutes from './routes/auth.routes.js';
// // // import { verifyToken, allowSection } from './middleware/auth.js';
// // import uploadRoutes from "./routes/upload.routes.js";

// // dotenvFlow.config();
// // console.log('NODE_ENV:', process.env.NODE_ENV);

// // const app = express();
// // const FRONTEND = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// // // CORS configuration
// // app.use(cors({
// //   origin: FRONTEND,
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));

// // // Middleware
// // app.use(cookieParser());
// // app.use(express.json());

// // // Routes
// // app.use('/api/auth', authRoutes);
// // // app.use('/api/solvent', verifyToken, allowSection('solvent'), solventRoutes);
// // // app.use('/api/prep', verifyToken, allowSection('prep'), prepRoutes);



// // app.use("/api", uploadRoutes);




// // // Error handling
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ message: 'Something went wrong', error: err.message });
// // });

// // // Server startup
// // connectDB()
// //   .then(() => {
// //     const PORT = process.env.PORT || 5000;
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //       console.log('MongoDB connected successfully');
// //     });
// //   })
// //   .catch((err) => {
// //     console.error('Failed to connect to MongoDB:', err);
// //     process.exit(1);
// //   });





// // server.js or index.js

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// import { verifyToken, allowSection } from './middleware/auth.js';


// // Import routes
// import uploadRoutes from "./routes/upload.routes.js";
// import workOrderRoutes from "./routes/WorkOrder.routes.js";

// // Load environment variables
// dotenv.config();
// []
// // ES Module __dirname equivalent
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Initialize Express app
// const app = express();

// // ============================================
// // Middleware Configuration
// // ============================================

// // CORS Configuration
// const corsOptions = {
//   origin: process.env.CLIENT_URL || "http://localhost:3000",
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// // Body Parser Middleware
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // Request Logging Middleware (Development)
// if (process.env.NODE_ENV === "development") {
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`);
//     next();
//   });
// }



// // --- Ensure MongoDB connection before requests ---
// let isConnected = false;
// const ensureDBConnection = async () => {
//   if (isConnected) return;
//   try {
//     await connectDB();
//     isConnected = true;
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//   }
// };









// // Routes
// // ============================================

// // Health check route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Work Order Management API",
//     version: "1.0.0",
//     endpoints: {
//       workOrders: "/api/workorders",
//       upload: "/api/upload",
//       health: "/health",
//     },
//   });
// });


// // API Routes
// app.use("/api",verifyToken, uploadRoutes);
// app.use("/api/workorders",verifyToken, workOrderRoutes);

// // ============================================
// // Error Handling Middleware
// // ============================================

// // 404 Handler - Route not found
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err);

//   // Mongoose validation error
//   if (err.name === "ValidationError") {
//     const errors = Object.keys(err.errors).reduce((acc, key) => {
//       acc[key] = err.errors[key].message;
//       return acc;
//     }, {});

//     return res.status(400).json({
//       success: false,
//       message: "Validation Error",
//       errors,
//     });
//   }

//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     return res.status(400).json({
//       success: false,
//       message: "Duplicate field value entered",
//       field: Object.keys(err.keyPattern)[0],
//     });
//   }

//   // Mongoose cast error (invalid ObjectId)
//   if (err.name === "CastError") {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid ID format",
//     });
//   }

//   // JWT errors (when you add authentication)
//   if (err.name === "JsonWebTokenError") {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }

//   if (err.name === "TokenExpiredError") {
//     return res.status(401).json({
//       success: false,
//       message: "Token expired",
//     });
//   }

//   // Multer errors (file upload)
//   if (err.name === "MulterError") {
//     if (err.code === "LIMIT_FILE_SIZE") {
//       return res.status(400).json({
//         success: false,
//         message: "File size too large. Maximum size is 10MB",
//       });
//     }
//     if (err.code === "LIMIT_FILE_COUNT") {
//       return res.status(400).json({
//         success: false,
//         message: "Too many files. Maximum is 10 files",
//       });
//     }
//     return res.status(400).json({
//       success: false,
//       message: "File upload error",
//       error: err.message,
//     });
//   }

//   // Default error
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

// // ============================================
// // Graceful Shutdown
// // ============================================


// process.on("SIGINT", () => {
//   console.log("👋 SIGINT received. Shutting down gracefully...");
//   mongoose.connection.close(() => {
//     console.log("Database connection closed.");
//     process.exit(0);
//   });
// });

// // ============================================
// // Start Server
// // ============================================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("=".repeat(50));
//   console.log(` Server running in ${process.env.NODE_ENV || "development"} mode`);
//   console.log(` Server URL: http://localhost:${PORT}`);
//   console.log(`API Documentation: http://localhost:${PORT}/`);
//   console.log("=".repeat(50));
// });

// // Export for testing
// export default app;





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
import authRoutes from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';


dotenvFlow.config(); // Load .env or .env.development

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =================== Middleware ===================
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
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

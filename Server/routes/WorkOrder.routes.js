// routes/workorder.routes.js

import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  createWorkOrder,
  getAllWorkOrders,
  getWorkOrderById,
  updateWorkOrder,
  deleteWorkOrder,
  deleteWorkOrderPhoto,
  updateTaskStatus,
  getWorkOrderStats,
  getWorkOrdersByDateRange,
  bulkUpdateStatus,
} from "../controller/WorkOrder.controller.js";

const router = express.Router();

// ============================================
// Statistics and Special Routes (before :id)
// ============================================

// Get work order statistics
// GET /api/workorders/stats
router.get("/stats", getWorkOrderStats);

// Get work orders by date range
// GET /api/workorders/date-range?startDate=2024-01-01&endDate=2024-12-31
router.get("/date-range", getWorkOrdersByDateRange);

// Bulk update work order status
// PATCH /api/workorders/bulk-update
// Body: { ids: ["id1", "id2"], status: "Completed" }
router.patch("/bulk-update", bulkUpdateStatus);

// ============================================
// Main CRUD Operations
// ============================================

// Create a new work order with photo upload
// POST /api/workorders
// Content-Type: multipart/form-data
router.post("/", upload.array("photos", 10), createWorkOrder);

// Get all work orders with filtering and pagination
// GET /api/workorders?page=1&limit=10&status=Open&priority=High&search=HVAC
router.get("/", getAllWorkOrders);

// Get single work order by ID
// GET /api/workorders/:id
router.get("/:id", getWorkOrderById);

// Update work order with optional photo upload
// PUT /api/workorders/:id
// Content-Type: multipart/form-data
router.put("/:id", upload.array("photos", 10), updateWorkOrder);

// Delete work order
// DELETE /api/workorders/:id
router.delete("/:id", deleteWorkOrder);

// ============================================
// Photo Management
// ============================================

// Delete a specific photo from work order
// DELETE /api/workorders/:id/photos/:photoId
router.delete("/:id/photos/:photoId", deleteWorkOrderPhoto);

// ============================================
// Task Management
// ============================================

// Update task within a checklist
// PATCH /api/workorders/:id/checklists/:checklistId/tasks/:taskId
// Body: { status: "Completed", name: "Task name", asset: "Asset", user: "User" }
router.patch("/:id/checklists/:checklistId/tasks/:taskId", updateTaskStatus);

export default router;
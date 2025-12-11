// // controllers/workorder.controller.js

// import WorkOrder from "../models/WorkOrder.model.js";
// import { cloudinary } from "../config/cloudinary.js";

// // @desc    Create a new work order
// // @route   POST /api/workorders
// // @access  Private (add auth middleware later)
// export const createWorkOrder = async (req, res) => {
//   try {
//     const workOrderData = req.body;

//     // Handle photos if uploaded
//     if (req.files && req.files.length > 0) {
//       workOrderData.photos = req.files.map((file) => ({
//         url: file.path,
//         publicId: file.filename,
//       }));
//     }

//     // Parse checklists if sent as string (from FormData)
//     if (typeof workOrderData.checklists === "string") {
//       try {
//         workOrderData.checklists = JSON.parse(workOrderData.checklists);
//       } catch (parseError) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid checklists format",
//         });
//       }
//     }

//     // Convert string booleans to actual booleans
//     if (typeof workOrderData.signatureRequired === "string") {
//       workOrderData.signatureRequired = workOrderData.signatureRequired === "true";
//     }

//     // Convert duration to number if it's a string
//     if (workOrderData.duration && typeof workOrderData.duration === "string") {
//       workOrderData.duration = parseFloat(workOrderData.duration);
//     }

//     // Create the work order
//     const workOrder = new WorkOrder(workOrderData);
//     await workOrder.save();

//     res.status(201).json({
//       success: true,
//       message: "Work order created successfully",
//       data: workOrder,
//     });
//   } catch (error) {
//     console.error("Error creating work order:", error);

//     // Clean up uploaded images if work order creation fails
//     if (req.files && req.files.length > 0) {
//       const deletePromises = req.files.map((file) =>
//         cloudinary.uploader.destroy(file.filename).catch((err) => {
//           console.error("Error deleting image:", err);
//         })
//       );
//       await Promise.allSettled(deletePromises);
//     }

//     // Handle validation errors
//     if (error.name === "ValidationError") {
//       const errors = Object.keys(error.errors).reduce((acc, key) => {
//         acc[key] = error.errors[key].message;
//         return acc;
//       }, {});

//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors,
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to create work order",
//     });
//   }
// };

// // @desc    Get all work orders with filtering and pagination
// // @route   GET /api/workorders
// // @access  Private
// export const getAllWorkOrders = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       status,
//       priority,
//       category,
//       search,
//       sortBy = "createdAt",
//       sortOrder = "desc",
//     } = req.query;

//     // Build filter object
//     const filter = {};

//     if (status) filter.status = status;
//     if (priority) filter.priority = priority;
//     if (category) filter.category = category;
    
//     if (search) {
//       filter.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//         { asset: { $regex: search, $options: "i" } },
//         { location: { $regex: search, $options: "i" } },
//       ];
//     }

//     // Calculate pagination
//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     // Build sort object
//     const sort = {};
//     sort[sortBy] = sortOrder === "asc" ? 1 : -1;

//     // Execute query
//     const workOrders = await WorkOrder.find(filter)
//       .sort(sort)
//       .limit(parseInt(limit))
//       .skip(skip)
//       .populate("createdBy", "name email"); // Uncomment when user auth is ready

//     // Get total count for pagination
//     const total = await WorkOrder.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       data: workOrders,
//       pagination: {
//         currentPage: parseInt(page),
//         totalPages: Math.ceil(total / parseInt(limit)),
//         totalItems: total,
//         itemsPerPage: parseInt(limit),
//         hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
//         hasPrevPage: parseInt(page) > 1,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching work orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch work orders",
//     });
//   }
// };

// // @desc    Get single work order by ID
// // @route   GET /api/workorders/:id
// // @access  Private
// export const getWorkOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const workOrder = await WorkOrder.findById(id).populate(
//       "createdBy",
//       "name email"
//     );

//     if (!workOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Work order not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: workOrder,
//     });
//   } catch (error) {
//     console.error("Error fetching work order:", error);
    
//     // Handle invalid MongoDB ObjectId
//     if (error.kind === "ObjectId") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid work order ID",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch work order",
//     });
//   }
// };

// // @desc    Update work order
// // @route   PUT /api/workorders/:id
// // @access  Private
// export const updateWorkOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = { ...req.body };

//     // Check if work order exists
//     const existingWorkOrder = await WorkOrder.findById(id);
//     if (!existingWorkOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Work order not found",
//       });
//     }

//     // Parse checklists if sent as string
//     if (typeof updateData.checklists === "string") {
//       try {
//         updateData.checklists = JSON.parse(updateData.checklists);
//       } catch (parseError) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid checklists format",
//         });
//       }
//     }

//     // Handle new photos if uploaded
//     if (req.files && req.files.length > 0) {
//       const newPhotos = req.files.map((file) => ({
//         url: file.path,
//         publicId: file.filename,
//       }));

//       // Parse existing photos if sent as string
//       let existingPhotos = [];
//       if (updateData.photos && typeof updateData.photos === "string") {
//         try {
//           existingPhotos = JSON.parse(updateData.photos);
//         } catch (e) {
//           existingPhotos = [];
//         }
//       }

//       // Combine existing and new photos
//       updateData.photos = [...existingPhotos, ...newPhotos];
//     }

//     // Convert string booleans to actual booleans
//     if (typeof updateData.signatureRequired === "string") {
//       updateData.signatureRequired = updateData.signatureRequired === "true";
//     }

//     // Convert duration to number if it's a string
//     if (updateData.duration && typeof updateData.duration === "string") {
//       updateData.duration = parseFloat(updateData.duration);
//     }

//     // If status is being changed to Completed, set completedAt
//     if (updateData.status === "Completed" && existingWorkOrder.status !== "Completed") {
//       updateData.completedAt = new Date();
//     }

//     const workOrder = await WorkOrder.findByIdAndUpdate(id, updateData, {
//       new: true, // Return updated document
//       runValidators: true, // Run schema validators
//     });

//     res.status(200).json({
//       success: true,
//       message: "Work order updated successfully",
//       data: workOrder,
//     });
//   } catch (error) {
//     console.error("Error updating work order:", error);

//     // Handle validation errors
//     if (error.name === "ValidationError") {
//       const errors = Object.keys(error.errors).reduce((acc, key) => {
//         acc[key] = error.errors[key].message;
//         return acc;
//       }, {});

//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors,
//       });
//     }

//     // Handle invalid MongoDB ObjectId
//     if (error.kind === "ObjectId") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid work order ID",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to update work order",
//     });
//   }
// };

// // @desc    Delete work order
// // @route   DELETE /api/workorders/:id
// // @access  Private
// export const deleteWorkOrder = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const workOrder = await WorkOrder.findById(id);

//     if (!workOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Work order not found",
//       });
//     }

//     // Delete associated images from Cloudinary
//     if (workOrder.photos && workOrder.photos.length > 0) {
//       const deletePromises = workOrder.photos.map((photo) =>
//         cloudinary.uploader.destroy(photo.publicId).catch((err) => {
//           console.error("Error deleting image from Cloudinary:", err);
//         })
//       );
//       await Promise.allSettled(deletePromises);
//     }

//     await WorkOrder.findByIdAndDelete(id);

//     res.status(200).json({
//       success: true,
//       message: "Work order deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting work order:", error);

//     // Handle invalid MongoDB ObjectId
//     if (error.kind === "ObjectId") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid work order ID",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to delete work order",
//     });
//   }
// };

// // @desc    Delete photo from work order
// // @route   DELETE /api/workorders/:id/photos/:photoId
// // @access  Private
// export const deleteWorkOrderPhoto = async (req, res) => {
//   try {
//     const { id, photoId } = req.params;

//     const workOrder = await WorkOrder.findById(id);

//     if (!workOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Work order not found",
//       });
//     }

//     // Find the photo
//     const photoIndex = workOrder.photos.findIndex(
//       (photo) => photo._id.toString() === photoId
//     );

//     if (photoIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Photo not found",
//       });
//     }

//     const photo = workOrder.photos[photoIndex];

//     // Delete from Cloudinary
//     if (photo.publicId) {
//       await cloudinary.uploader.destroy(photo.publicId).catch((err) => {
//         console.error("Error deleting image from Cloudinary:", err);
//       });
//     }

//     // Remove from array
//     workOrder.photos.splice(photoIndex, 1);
//     await workOrder.save();

//     res.status(200).json({
//       success: true,
//       message: "Photo deleted successfully",
//       data: workOrder,
//     });
//   } catch (error) {
//     console.error("Error deleting photo:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete photo",
//     });
//   }
// };

// // @desc    Update task status within a work order
// // @route   PATCH /api/workorders/:id/checklists/:checklistId/tasks/:taskId
// // @access  Private
// export const updateTaskStatus = async (req, res) => {
//   try {
//     const { id, checklistId, taskId } = req.params;
//     const { status, name, asset, user } = req.body;

//     const workOrder = await WorkOrder.findById(id);

//     if (!workOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Work order not found",
//       });
//     }

//     // Find and update the task
//     const checklist = workOrder.checklists.find(
//       (cl) => cl.id === parseInt(checklistId)
//     );

//     if (!checklist) {
//       return res.status(404).json({
//         success: false,
//         message: "Checklist not found",
//       });
//     }

//     const task = checklist.tasks.find((t) => t.id === parseInt(taskId));

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//       });
//     }

//     // Update task fields if provided
//     if (status) task.status = status;
//     if (name !== undefined) task.name = name;
//     if (asset !== undefined) task.asset = asset;
//     if (user !== undefined) task.user = user;

//     await workOrder.save();

//     res.status(200).json({
//       success: true,
//       message: "Task updated successfully",
//       data: workOrder,
//     });
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update task",
//     });
//   }
// };

// // @desc    Get work order statistics
// // @route   GET /api/workorders/stats
// // @access  Private
// export const getWorkOrderStats = async (req, res) => {
//   try {
//     const stats = await WorkOrder.aggregate([
//       {
//         $facet: {
//           byStatus: [
//             { $group: { _id: "$status", count: { $sum: 1 } } },
//             { $sort: { count: -1 } },
//           ],
//           byPriority: [
//             { $group: { _id: "$priority", count: { $sum: 1 } } },
//             { $sort: { count: -1 } },
//           ],
//           byCategory: [
//             { $group: { _id: "$category", count: { $sum: 1 } } },
//             { $sort: { count: -1 } },
//           ],
//           total: [{ $count: "total" }],
//           completed: [
//             { $match: { status: "Completed" } },
//             { $count: "count" },
//           ],
//           overdue: [
//             {
//               $match: {
//                 status: { $ne: "Completed" },
//                 dueDate: { $lt: new Date() },
//               },
//             },
//             { $count: "count" },
//           ],
//           recentWorkOrders: [
//             { $sort: { createdAt: -1 } },
//             { $limit: 5 },
//             {
//               $project: {
//                 title: 1,
//                 status: 1,
//                 priority: 1,
//                 createdAt: 1,
//               },
//             },
//           ],
//         },
//       },
//     ]);

//     // Format the response
//     const formattedStats = {
//       total: stats[0].total[0]?.total || 0,
//       completed: stats[0].completed[0]?.count || 0,
//       overdue: stats[0].overdue[0]?.count || 0,
//       byStatus: stats[0].byStatus,
//       byPriority: stats[0].byPriority,
//       byCategory: stats[0].byCategory,
//       recentWorkOrders: stats[0].recentWorkOrders,
//     };

//     res.status(200).json({
//       success: true,
//       data: formattedStats,
//     });
//   } catch (error) {
//     console.error("Error fetching work order stats:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch statistics",
//     });
//   }
// };

// // @desc    Get work orders by date range
// // @route   GET /api/workorders/date-range
// // @access  Private
// export const getWorkOrdersByDateRange = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Start date and end date are required",
//       });
//     }

//     const workOrders = await WorkOrder.find({
//       createdAt: {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       },
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: workOrders,
//       count: workOrders.length,
//     });
//   } catch (error) {
//     console.error("Error fetching work orders by date range:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch work orders",
//     });
//   }
// };

// // @desc    Bulk update work order status
// // @route   PATCH /api/workorders/bulk-update
// // @access  Private
// export const bulkUpdateStatus = async (req, res) => {
//   try {
//     const { ids, status } = req.body;

//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Work order IDs are required",
//       });
//     }

//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         message: "Status is required",
//       });
//     }

//     const updateData = { status };
//     if (status === "Completed") {
//       updateData.completedAt = new Date();
//     }

//     const result = await WorkOrder.updateMany(
//       { _id: { $in: ids } },
//       { $set: updateData }
//     );

//     res.status(200).json({
//       success: true,
//       message: `${result.modifiedCount} work orders updated successfully`,
//       data: {
//         matchedCount: result.matchedCount,
//         modifiedCount: result.modifiedCount,
//       },
//     });
//   } catch (error) {
//     console.error("Error bulk updating work orders:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update work orders",
//     });
//   }
// };






// @desc    Update work order
// @route   PUT /api/workorders/:id
// @access  Private
// export const updateWorkOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = { ...req.body };

//     // Check if work order exists
//     const existingWorkOrder = await WorkOrder.findById(id);
//     if (!existingWorkOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Work order not found",
//       });
//     }

//     // Parse checklists if sent as string
//     if (typeof updateData.checklists === "string") {
//       try {
//         updateData.checklists = JSON.parse(updateData.checklists);
//       } catch (parseError) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid checklists format",
//         });
//       }
//     }

//     // Filter out empty checklists and tasks
//     if (updateData.checklists && Array.isArray(updateData.checklists)) {
//       updateData.checklists = updateData.checklists
//         .map((checklist) => ({
//           ...checklist,
//           tasks: checklist.tasks.filter((task) => task.name && task.name.trim() !== ""),
//         }))
//         .filter((checklist) => checklist.tasks.length > 0);
//     }

//     // Handle new photos if uploaded
//     if (req.files && req.files.length > 0) {
//       const newPhotos = req.files.map((file) => ({
//         url: file.path,
//         publicId: file.filename,
//       }));

//       // Parse existing photos if sent as string
//       let existingPhotos = [];
//       if (updateData.photos && typeof updateData.photos === "string") {
//         try {
//           existingPhotos = JSON.parse(updateData.photos);
//         } catch (e) {
//           existingPhotos = [];
//         }
//       }

//       // Combine existing and new photos
//       updateData.photos = [...existingPhotos, ...newPhotos];
//     } else if (!updateData.photos) {
//       // If no new photos and no existing photos data, keep original
//       delete updateData.photos;
//     }

//     // Convert string booleans to actual booleans
//     if (typeof updateData.signatureRequired === "string") {
//       updateData.signatureRequired = updateData.signatureRequired === "true";
//     }

//     // Convert duration to number if it's a string
//     if (updateData.duration && typeof updateData.duration === "string") {
//       updateData.duration = parseFloat(updateData.duration);
//     }

//     // If status is being changed to Completed, set completedAt
//     if (updateData.status === "Completed" && existingWorkOrder.status !== "Completed") {
//       updateData.completedAt = new Date();
//     }

//     const workOrder = await WorkOrder.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Work order updated successfully",
//       data: workOrder,
//     });
//   } catch (error) {
//     console.error("Error updating work order:", error);

//     if (error.name === "ValidationError") {
//       const errors = Object.keys(error.errors).reduce((acc, key) => {
//         acc[key] = error.errors[key].message;
//         return acc;
//       }, {});

//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors,
//       });
//     }

//     if (error.kind === "ObjectId") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid work order ID",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to update work order",
//     });
//   }
// };





// controllers/workorder.controller.js

import WorkOrder from "../models/WorkOrder.model.js";
import { cloudinary } from "../config/cloudinary.js";

// @desc    Create a new work order
// @route   POST /api/workorders
// @access  Private (add auth middleware later)
export const createWorkOrder = async (req, res) => {
  try {
    const workOrderData = req.body;

    // Handle photos if uploaded
    if (req.files && req.files.length > 0) {
      workOrderData.photos = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));
    } else {
      // If no photos, set to empty array
      workOrderData.photos = [];
    }

    // Parse checklists if sent as string (from FormData)
    if (typeof workOrderData.checklists === "string") {
      try {
        workOrderData.checklists = JSON.parse(workOrderData.checklists);
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Invalid checklists format",
        });
      }
    }

    // Filter out empty checklists and tasks
    if (workOrderData.checklists && Array.isArray(workOrderData.checklists)) {
      workOrderData.checklists = workOrderData.checklists
        .map((checklist) => ({
          ...checklist,
          // Filter out tasks with empty names
          tasks: checklist.tasks.filter((task) => task.name && task.name.trim() !== ""),
        }))
        // Remove checklists with no valid tasks
        .filter((checklist) => checklist.tasks.length > 0);
    } else {
      // If no checklists, set to empty array
      workOrderData.checklists = [];
    }

    // Convert string booleans to actual booleans
    if (typeof workOrderData.signatureRequired === "string") {
      workOrderData.signatureRequired = workOrderData.signatureRequired === "true";
    }

    // Convert duration to number if it's a string
    if (workOrderData.duration && typeof workOrderData.duration === "string") {
      workOrderData.duration = parseFloat(workOrderData.duration);
    }

    // Create the work order
    const workOrder = new WorkOrder(workOrderData);
    await workOrder.save();

    res.status(201).json({
      success: true,
      message: "Work order created successfully",
      data: workOrder,
    });
  } catch (error) {
    console.error("Error creating work order:", error);

    // Clean up uploaded images if work order creation fails
    if (req.files && req.files.length > 0) {
      const deletePromises = req.files.map((file) =>
        cloudinary.uploader.destroy(file.filename).catch((err) => {
          console.error("Error deleting image:", err);
        })
      );
      await Promise.allSettled(deletePromises);
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create work order",
    });
  }
};




export const updateWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const existingWorkOrder = await WorkOrder.findById(id);
    if (!existingWorkOrder) {
      return res.status(404).json({
        success: false,
        message: "Work order not found",
      });
    }

    // Parse checklists if sent as string
    if (typeof updateData.checklists === "string") {
      try {
        updateData.checklists = JSON.parse(updateData.checklists);
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Invalid checklists format",
        });
      }
    }

    // Filter out empty checklists and tasks
    if (updateData.checklists && Array.isArray(updateData.checklists)) {
      updateData.checklists = updateData.checklists
        .map((checklist) => ({
          ...checklist,
          tasks: checklist.tasks.filter((task) => task.name && task.name.trim() !== ""),
        }))
        .filter((checklist) => checklist.tasks.length > 0);
    }

    // Handle photos
    let photos = [];
    
    // Parse existing photos from request
    if (updateData.existingPhotos && typeof updateData.existingPhotos === "string") {
      try {
        photos = JSON.parse(updateData.existingPhotos);
      } catch (e) {
        photos = [];
      }
    }

    // Add new photos if uploaded
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
      }));
      photos = [...photos, ...newPhotos];
    }

    updateData.photos = photos;
    delete updateData.existingPhotos; // Remove this field

    // Convert string booleans to actual booleans
    if (typeof updateData.signatureRequired === "string") {
      updateData.signatureRequired = updateData.signatureRequired === "true";
    }

    // Convert duration to number if it's a string
    if (updateData.duration && typeof updateData.duration === "string") {
      updateData.duration = parseFloat(updateData.duration);
    }

    // If status is being changed to Completed, set completedAt
    if (updateData.status === "Completed" && existingWorkOrder.status !== "Completed") {
      updateData.completedAt = new Date();
    }

    const workOrder = await WorkOrder.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Work order updated successfully",
      data: workOrder,
    });
  } catch (error) {
    console.error("Error updating work order:", error);

    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid work order ID",
        });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update work order",
    });
  }
};

// ... rest of the controller functions remain the same

// @desc    Get all work orders with filtering and pagination
// @route   GET /api/workorders
// @access  Private
export const getAllWorkOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      category,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { asset: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const workOrders = await WorkOrder.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate("createdBy", "name email");

    const total = await WorkOrder.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: workOrders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrevPage: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching work orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch work orders",
    });
  }
};

// @desc    Get single work order by ID
// @route   GET /api/workorders/:id
// @access  Private
export const getWorkOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const workOrder = await WorkOrder.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: "Work order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workOrder,
    });
  } catch (error) {
    console.error("Error fetching work order:", error);
    
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid work order ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch work order",
    });
  }
};

// @desc    Delete work order
// @route   DELETE /api/workorders/:id
// @access  Private
export const deleteWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const workOrder = await WorkOrder.findById(id);

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: "Work order not found",
      });
    }

    if (workOrder.photos && workOrder.photos.length > 0) {
      const deletePromises = workOrder.photos.map((photo) =>
        cloudinary.uploader.destroy(photo.publicId).catch((err) => {
          console.error("Error deleting image from Cloudinary:", err);
        })
      );
      await Promise.allSettled(deletePromises);
    }

    await WorkOrder.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Work order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting work order:", error);

    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid work order ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete work order",
    });
  }
};

// @desc    Delete photo from work order
// @route   DELETE /api/workorders/:id/photos/:photoId
// @access  Private
export const deleteWorkOrderPhoto = async (req, res) => {
  try {
    const { id, photoId } = req.params;

    const workOrder = await WorkOrder.findById(id);

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: "Work order not found",
      });
    }

    const photoIndex = workOrder.photos.findIndex(
      (photo) => photo._id.toString() === photoId
    );

    if (photoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    const photo = workOrder.photos[photoIndex];

    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId).catch((err) => {
        console.error("Error deleting image from Cloudinary:", err);
      });
    }

    workOrder.photos.splice(photoIndex, 1);
    await workOrder.save();

    res.status(200).json({
      success: true,
      message: "Photo deleted successfully",
      data: workOrder,
    });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete photo",
    });
  }
};

// @desc    Update task status within a work order
// @route   PATCH /api/workorders/:id/checklists/:checklistId/tasks/:taskId
// @access  Private
export const updateTaskStatus = async (req, res) => {
  try {
    const { id, checklistId, taskId } = req.params;
    const { status, name, asset, user } = req.body;

    const workOrder = await WorkOrder.findById(id);

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: "Work order not found",
      });
    }

    const checklist = workOrder.checklists.find(
      (cl) => cl.id === parseInt(checklistId)
    );

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: "Checklist not found",
      });
    }

    const task = checklist.tasks.find((t) => t.id === parseInt(taskId));

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (status) task.status = status;
    if (name !== undefined) task.name = name;
    if (asset !== undefined) task.asset = asset;
    if (user !== undefined) task.user = user;

    await workOrder.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: workOrder,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

// @desc    Get work order statistics
// @route   GET /api/workorders/stats
// @access  Private
export const getWorkOrderStats = async (req, res) => {
  try {
    const stats = await WorkOrder.aggregate([
      {
        $facet: {
          byStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          byPriority: [
            { $group: { _id: "$priority", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          byCategory: [
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          total: [{ $count: "total" }],
          completed: [
            { $match: { status: "Completed" } },
            { $count: "count" },
          ],
          overdue: [
            {
              $match: {
                status: { $ne: "Completed" },
                dueDate: { $lt: new Date() },
              },
            },
            { $count: "count" },
          ],
          recentWorkOrders: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $project: {
                title: 1,
                status: 1,
                priority: 1,
                createdAt: 1,
              },
            },
          ],
        },
      },
    ]);

    const formattedStats = {
      total: stats[0].total[0]?.total || 0,
      completed: stats[0].completed[0]?.count || 0,
      overdue: stats[0].overdue[0]?.count || 0,
      byStatus: stats[0].byStatus,
      byPriority: stats[0].byPriority,
      byCategory: stats[0].byCategory,
      recentWorkOrders: stats[0].recentWorkOrders,
    };

    res.status(200).json({
      success: true,
      data: formattedStats,
    });
  } catch (error) {
    console.error("Error fetching work order stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};

// @desc    Get work orders by date range
// @route   GET /api/workorders/date-range
// @access  Private
export const getWorkOrdersByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date are required",
      });
    }

    const workOrders = await WorkOrder.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: workOrders,
      count: workOrders.length,
    });
  } catch (error) {
    console.error("Error fetching work orders by date range:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch work orders",
    });
  }
};

// @desc    Bulk update work order status
// @route   PATCH /api/workorders/bulk-update
// @access  Private
export const bulkUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Work order IDs are required",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const updateData = { status };
    if (status === "Completed") {
      updateData.completedAt = new Date();
    }

    const result = await WorkOrder.updateMany(
      { _id: { $in: ids } },
      { $set: updateData }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} work orders updated successfully`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error("Error bulk updating work orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update work orders",
    });
  }
};
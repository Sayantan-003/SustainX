// // models/WorkOrder.js

// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ["Not Started", "In Progress", "Completed"],
//     default: "Not Started"
//   },
//   asset: { type: String, default: "" },
//   user: { type: String, default: "" },
// });

// const checklistSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   isExpanded: { type: Boolean, default: true },
//   tasks: [taskSchema],
// });

// const workOrderSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       minlength: [3, "Title must be at least 3 characters"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: [true, "Category is required"],
//       trim: true,
//     },
//     priority: {
//       type: String,
//       enum: ["Low", "Medium", "High"],
//       default: "Low",
//     },
//     status: {
//       type: String,
//       enum: ["Open", "In Progress", "Completed", "Closed", "On Hold"],
//       default: "Open",
//     },
//     photos: [
//       {
//         url: { type: String, required: true },
//         publicId: { type: String }, // Cloudinary public ID for deletion
//       },
//     ],
//     asset: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//     location: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//     startDate: {
//       type: Date,
//       default: Date.now,
//     },
//     dueDate: {
//       type: Date,
//       default: Date.now,
//     },
//     duration: {
//       type: Number,
//       min: 0,
//       default: 0,
//     },
//     primaryAssignee: {
//       type: String,
//       default: "",
//     },
//     team: {
//       type: String,
//       default: "",
//     },
//     additionalAssignees: {
//       type: String,
//       default: "",
//     },
//     signatureRequired: {
//       type: Boolean,
//       default: false,
//     },
//     checklists: [checklistSchema],
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       // Uncomment when you have user authentication
//       // required: true,
//     },
//     completedAt: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//   }
// );

// // Indexes for better query performance
// workOrderSchema.index({ status: 1, createdAt: -1 });
// workOrderSchema.index({ priority: 1 });
// workOrderSchema.index({ category: 1 });

// // Virtual for checking if overdue
// workOrderSchema.virtual("isOverdue").get(function () {
//   return this.status !== "Completed" && new Date() > this.dueDate;
// });

// // Method to calculate completion percentage
// workOrderSchema.methods.getCompletionPercentage = function () {
//   let totalTasks = 0;
//   let completedTasks = 0;

//   this.checklists.forEach((checklist) => {
//     totalTasks += checklist.tasks.length;
//     completedTasks += checklist.tasks.filter(
//       (task) => task.status === "Completed"
//     ).length;
//   });

//   return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
// };

// export default mongoose.model("WorkOrder", workOrderSchema);






/****************************Updated Work Order.js with Checklist records********************************/
// models/WorkOrder.js

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  taskId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Checklist.tasks',
    default: null // null if task was created manually (not from template)
  },
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started"
  },
  asset: { type: String, default: "" },
  user: { type: String, default: "" },
});

const checklistSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  checklistId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Checklist',
    default: null // null if checklist was created manually (not from template)
  },
  name: { type: String, required: true },
  isExpanded: { type: Boolean, default: true },
  tasks: [taskSchema],
});

const workOrderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Closed", "On Hold","Overdue"],
      default: "Open",
    },
    photos: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
      },
    ],
    asset: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      min: 0,
      default: 0,
    },
    primaryAssignee: {
      type: String,
      default: "",
    },
    team: {
      type: String,
      default: "",
    },
    additionalAssignees: {
      type: String,
      default: "",
    },
    signatureRequired: {
      type: Boolean,
      default: false,
    },
    checklists: [checklistSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true, // Uncomment when you have user authentication
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for better query performance
workOrderSchema.index({ status: 1, createdAt: -1 });
workOrderSchema.index({ priority: 1 });
workOrderSchema.index({ category: 1 });
workOrderSchema.index({ 'checklists.checklistId': 1 }); // Index for querying by checklist template

// Virtual for checking if overdue
workOrderSchema.virtual("isOverdue").get(function () {
  return this.status !== "Completed" && new Date() > this.dueDate;
});

// Method to calculate completion percentage
workOrderSchema.methods.getCompletionPercentage = function () {
  let totalTasks = 0;
  let completedTasks = 0;

  this.checklists.forEach((checklist) => {
    totalTasks += checklist.tasks.length;
    completedTasks += checklist.tasks.filter(
      (task) => task.status === "Completed"
    ).length;
  });

  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
};

// Method to get checklist usage statistics
workOrderSchema.statics.getChecklistUsageStats = async function(checklistId) {
  return await this.aggregate([
    {
      $match: {
        'checklists.checklistId': mongoose.Types.ObjectId(checklistId)
      }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

// Method to find all work orders using a specific checklist template
workOrderSchema.statics.findByChecklistTemplate = async function(checklistId) {
  return await this.find({
    'checklists.checklistId': checklistId
  }).populate('createdBy', 'username');
};

export default mongoose.model("WorkOrder", workOrderSchema);
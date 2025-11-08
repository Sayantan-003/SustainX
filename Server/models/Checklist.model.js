// // models/Checklist.js
// import mongoose from 'mongoose';

// const taskSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   asset: {
//     type: String,
//     default: ''
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Date,
//     default: null
//   },
//   completedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     default: null
//   }
// }, { _id: true });

// const checklistSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Checklist name is required'],
//     trim: true
//   },
//   section: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   tasks: [taskSchema],
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   organization: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Organization',
//     required: true
//   },
//   isTemplate: {
//     type: Boolean,
//     default: false
//   },
//   status: {
//     type: String,
//     enum: ['active', 'completed', 'archived'],
//     default: 'active'
//   },
//   completionPercentage: {
//     type: Number,
//     default: 0
//   }
// }, {
//   timestamps: true
// });

// // Virtual for completed tasks count
// checklistSchema.virtual('completedTasksCount').get(function() {
//   return this.tasks.filter(task => task.isCompleted).length;
// });

// // Virtual for total tasks count
// checklistSchema.virtual('totalTasksCount').get(function() {
//   return this.tasks.length;
// });

// // Method to calculate completion percentage
// checklistSchema.methods.calculateCompletionPercentage = function() {
//   if (this.tasks.length === 0) {
//     this.completionPercentage = 0;
//   } else {
//     const completedCount = this.tasks.filter(task => task.isCompleted).length;
//     this.completionPercentage = Math.round((completedCount / this.tasks.length) * 100);
//   }
//   return this.completionPercentage;
// };

// // Pre-save middleware to update completion percentage
// checklistSchema.pre('save', function(next) {
//   this.calculateCompletionPercentage();
  
//   // Auto-update status based on completion
//   if (this.completionPercentage === 100) {
//     this.status = 'completed';
//   } else if (this.status === 'completed' && this.completionPercentage < 100) {
//     this.status = 'active';
//   }
  
//   next();
// });

// // Index for faster queries
// checklistSchema.index({ organization: 1, createdBy: 1 });
// checklistSchema.index({ status: 1 });
// checklistSchema.index({ createdAt: -1 });

// const Checklist = mongoose.model('Checklist', checklistSchema);

// export default  Checklist;



// models/Checklist.model.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  asset: {
    type: String,
    default: ''
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
 
}, { _id: true });

const checklistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Checklist name is required'],
    trim: true
  },
  section: {
    type: String,
    default: '',
    trim: true
  },
  tasks: [taskSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active'
  },
}, {
  timestamps: true
});

// Virtual for completed tasks count
checklistSchema.virtual('completedTasksCount').get(function() {
  return this.tasks.filter(task => task.isCompleted).length;
});

// Virtual for total tasks count
checklistSchema.virtual('totalTasksCount').get(function() {
  return this.tasks.length;
});

// Method to calculate completion percentage
checklistSchema.methods.calculateCompletionPercentage = function() {
  if (this.tasks.length === 0) {
    this.completionPercentage = 0;
  } else {
    const completedCount = this.tasks.filter(task => task.isCompleted).length;
    this.completionPercentage = Math.round((completedCount / this.tasks.length) * 100);
  }
  return this.completionPercentage;
};

// Pre-save middleware to update completion percentage
checklistSchema.pre('save', function(next) {
  this.calculateCompletionPercentage();
  
  // Auto-update status based on completion
  if (this.completionPercentage === 100) {
    this.status = 'completed';
  } else if (this.status === 'completed' && this.completionPercentage < 100) {
    this.status = 'active';
  }
  
  next();
});

// Index for faster queries
checklistSchema.index({ createdBy: 1 });
checklistSchema.index({ status: 1 });
checklistSchema.index({ createdAt: -1 });

const Checklist = mongoose.model('Checklist', checklistSchema);

export default Checklist;
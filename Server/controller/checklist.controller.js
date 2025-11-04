// controllers/checklistController.js
const Checklist = require('../models/Checklist');

// @desc    Create new checklist
// @route   POST /api/checklists
// @access  Private
exports.createChecklist = async (req, res) => {
  try {
    const { name, section, tasks } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Checklist name is required'
      });
    }

    // Create checklist
    const checklist = await Checklist.create({
      name: name.trim(),
      section: section || '',
      tasks: tasks || [],
      createdBy: req.user._id,
      organization: req.user.organization
    });

    // Populate creator info
    await checklist.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Checklist created successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error creating checklist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create checklist',
      error: error.message
    });
  }
};

// @desc    Get all checklists with filters
// @route   GET /api/checklists
// @access  Private
exports.getAllChecklists = async (req, res) => {
  try {
    const {
      status,
      isTemplate,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {
      organization: req.user.organization
    };

    if (status) {
      query.status = status;
    }

    if (isTemplate !== undefined) {
      query.isTemplate = isTemplate === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { section: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    // Execute query
    const [checklists, total] = await Promise.all([
      Checklist.find(query)
        .populate('createdBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Checklist.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      message: 'Checklists fetched successfully',
      data: checklists,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching checklists:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch checklists',
      error: error.message
    });
  }
};

// @desc    Get single checklist by ID
// @route   GET /api/checklists/:id
// @access  Private
exports.getChecklistById = async (req, res) => {
  try {
    const checklist = await Checklist.findOne({
      _id: req.params.id,
      organization: req.user.organization
    }).populate('createdBy', 'name email')
      .populate('tasks.completedBy', 'name email');

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Checklist fetched successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error fetching checklist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch checklist',
      error: error.message
    });
  }
};

// @desc    Update checklist
// @route   PUT /api/checklists/:id
// @access  Private
exports.updateChecklist = async (req, res) => {
  try {
    const { name, section, tasks, status, isTemplate } = req.body;

    const checklist = await Checklist.findOne({
      _id: req.params.id,
      organization: req.user.organization
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    // Update fields
    if (name !== undefined) checklist.name = name.trim();
    if (section !== undefined) checklist.section = section;
    if (tasks !== undefined) checklist.tasks = tasks;
    if (status !== undefined) checklist.status = status;
    if (isTemplate !== undefined) checklist.isTemplate = isTemplate;

    await checklist.save();
    await checklist.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Checklist updated successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error updating checklist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update checklist',
      error: error.message
    });
  }
};

// @desc    Delete checklist
// @route   DELETE /api/checklists/:id
// @access  Private
exports.deleteChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findOneAndDelete({
      _id: req.params.id,
      organization: req.user.organization
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Checklist deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete checklist',
      error: error.message
    });
  }
};

// @desc    Toggle task completion
// @route   PATCH /api/checklists/:id/tasks/:taskId/toggle
// @access  Private
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { id, taskId } = req.params;

    const checklist = await Checklist.findOne({
      _id: id,
      organization: req.user.organization
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    const task = checklist.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Toggle completion
    task.isCompleted = !task.isCompleted;
    task.completedAt = task.isCompleted ? new Date() : null;
    task.completedBy = task.isCompleted ? req.user._id : null;

    await checklist.save();
    await checklist.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
};

// @desc    Add task to checklist
// @route   POST /api/checklists/:id/tasks
// @access  Private
exports.addTask = async (req, res) => {
  try {
    const { description, asset } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task description is required'
      });
    }

    const checklist = await Checklist.findOne({
      _id: req.params.id,
      organization: req.user.organization
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    checklist.tasks.push({
      description: description.trim(),
      asset: asset || ''
    });

    await checklist.save();
    await checklist.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task added successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add task',
      error: error.message
    });
  }
};

// @desc    Update task in checklist
// @route   PUT /api/checklists/:id/tasks/:taskId
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { description, asset } = req.body;

    const checklist = await Checklist.findOne({
      _id: id,
      organization: req.user.organization
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    const task = checklist.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (description !== undefined) task.description = description.trim();
    if (asset !== undefined) task.asset = asset;

    await checklist.save();
    await checklist.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
};

// @desc    Delete task from checklist
// @route   DELETE /api/checklists/:id/tasks/:taskId
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const { id, taskId } = req.params;

    const checklist = await Checklist.findOne({
      _id: id,
      organization: req.user.organization
    });

    if (!checklist) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    checklist.tasks.pull(taskId);
    await checklist.save();
    await checklist.populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: checklist
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message
    });
  }
};

// @desc    Duplicate checklist
// @route   POST /api/checklists/:id/duplicate
// @access  Private
exports.duplicateChecklist = async (req, res) => {
  try {
    const original = await Checklist.findOne({
      _id: req.params.id,
      organization: req.user.organization
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Checklist not found'
      });
    }

    // Create duplicate
    const duplicate = await Checklist.create({
      name: `${original.name} (Copy)`,
      section: original.section,
      tasks: original.tasks.map(task => ({
        description: task.description,
        asset: task.asset,
        isCompleted: false
      })),
      createdBy: req.user._id,
      organization: req.user.organization,
      isTemplate: original.isTemplate
    });

    await duplicate.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Checklist duplicated successfully',
      data: duplicate
    });
  } catch (error) {
    console.error('Error duplicating checklist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate checklist',
      error: error.message
    });
  }
};

// @desc    Get checklist statistics
// @route   GET /api/checklists/stats
// @access  Private
exports.getChecklistStats = async (req, res) => {
  try {
    const stats = await Checklist.aggregate([
      {
        $match: { organization: req.user.organization }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalChecklists = await Checklist.countDocuments({
      organization: req.user.organization
    });

    const avgCompletion = await Checklist.aggregate([
      {
        $match: { organization: req.user.organization }
      },
      {
        $group: {
          _id: null,
          avgPercentage: { $avg: '$completionPercentage' }
        }
      }
    ]);

    const formattedStats = {
      total: totalChecklists,
      byStatus: stats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      averageCompletion: avgCompletion[0]?.avgPercentage || 0
    };

    res.status(200).json({
      success: true,
      message: 'Statistics fetched successfully',
      data: formattedStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
};
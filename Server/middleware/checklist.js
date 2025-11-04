// utils/checklistValidation.js

/**
 * Validate checklist creation data
 */
exports.validateChecklistData = (data) => {
  const errors = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Checklist name is required');
  } else if (data.name.trim().length === 0) {
    errors.push('Checklist name cannot be empty');
  } else if (data.name.length > 200) {
    errors.push('Checklist name must be less than 200 characters');
  }

  // Validate section (optional)
  if (data.section && typeof data.section !== 'string') {
    errors.push('Section must be a string');
  } else if (data.section && data.section.length > 500) {
    errors.push('Section must be less than 500 characters');
  }

  // Validate tasks (optional)
  if (data.tasks) {
    if (!Array.isArray(data.tasks)) {
      errors.push('Tasks must be an array');
    } else {
      data.tasks.forEach((task, index) => {
        if (!task.description || typeof task.description !== 'string') {
          errors.push(`Task ${index + 1}: description is required`);
        } else if (task.description.trim().length === 0) {
          errors.push(`Task ${index + 1}: description cannot be empty`);
        } else if (task.description.length > 500) {
          errors.push(`Task ${index + 1}: description must be less than 500 characters`);
        }

        if (task.asset && typeof task.asset !== 'string') {
          errors.push(`Task ${index + 1}: asset must be a string`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate task data
 */
exports.validateTaskData = (data) => {
  const errors = [];

  if (!data.description || typeof data.description !== 'string') {
    errors.push('Task description is required');
  } else if (data.description.trim().length === 0) {
    errors.push('Task description cannot be empty');
  } else if (data.description.length > 500) {
    errors.push('Task description must be less than 500 characters');
  }

  if (data.asset && typeof data.asset !== 'string') {
    errors.push('Asset must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate checklist status
 */
exports.validateStatus = (status) => {
  const validStatuses = ['active', 'completed', 'archived'];
  
  if (!status) {
    return {
      isValid: false,
      errors: ['Status is required']
    };
  }

  if (!validStatuses.includes(status)) {
    return {
      isValid: false,
      errors: [`Status must be one of: ${validStatuses.join(', ')}`]
    };
  }

  return {
    isValid: true,
    errors: []
  };
};

/**
 * Sanitize checklist input data
 */
exports.sanitizeChecklistData = (data) => {
  const sanitized = {};

  if (data.name) {
    sanitized.name = data.name.trim();
  }

  if (data.section !== undefined) {
    sanitized.section = data.section ? data.section.trim() : '';
  }

  if (data.tasks && Array.isArray(data.tasks)) {
    sanitized.tasks = data.tasks.map(task => ({
      description: task.description ? task.description.trim() : '',
      asset: task.asset ? task.asset.trim() : '',
      isCompleted: Boolean(task.isCompleted)
    }));
  }

  if (data.status) {
    sanitized.status = data.status;
  }

  if (data.isTemplate !== undefined) {
    sanitized.isTemplate = Boolean(data.isTemplate);
  }

  return sanitized;
};

/**
 * Validate MongoDB ObjectId
 */
exports.isValidObjectId = (id) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};
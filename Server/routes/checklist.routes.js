// routes/checklistRoutes.js
import express from  'express';
const router = express.Router();
import {
  createChecklist,
  getAllChecklists,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
  toggleTaskCompletion,
  addTask,
  updateTask,
  deleteTask,
  duplicateChecklist,
  getChecklistStats
} from '../controller/checklist.controller.js';



// Checklist CRUD routes
router.route('/')
  .post(createChecklist)
  .get(getAllChecklists);

// Stats route (must be before /:id to avoid matching 'stats' as an ID)
router.get('/stats', getChecklistStats);

router.route('/:id')
  .get(getChecklistById)
  .put(updateChecklist)
  .delete(deleteChecklist);

// Duplicate checklist
router.post('/:id/duplicate', duplicateChecklist);

// Task management routes
router.route('/:id/tasks')
  .post(addTask);

router.route('/:id/tasks/:taskId')
  .put(updateTask)
  .delete(deleteTask);

// Toggle task completion
router.patch('/:id/tasks/:taskId/toggle', toggleTaskCompletion);

export default router;
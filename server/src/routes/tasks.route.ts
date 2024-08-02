/** @format */

import * as express from 'express';

// middlewares
import { checkTasksIdValid, validateTasksPayload, validateTasksStatus } from '../middlewares/tasks.middleware';
import { authMiddleware, userRolesMiddleware } from '../middlewares/auth.middleware';

// conrollers
import {
  createTaskContoller,
  deleteTaskPayloadByIdController,
  getAllTaskController,
  getTaskByIdController,
  getTaskLogsByIdController,
  updateTaskPayloadByIdController,
  updateTaskStatusByIdController,
} from '../controllers/tasks.controller';

import { APP_ROLE_CREATE_TASKS, APP_ROLE_DELETE_TASKS, APP_ROLE_EDIT_TASKS } from '../constants/user-roles';

const router = express.Router();

router.post('/tasks', authMiddleware, userRolesMiddleware([APP_ROLE_CREATE_TASKS]), validateTasksPayload, createTaskContoller);

router.get('/tasks', authMiddleware, getAllTaskController);
router.get('/tasks/:taskId', authMiddleware, checkTasksIdValid, getTaskByIdController);

router.get('/tasks/:taskId/logs', authMiddleware, checkTasksIdValid, getTaskLogsByIdController);

router.put('/tasks/:taskId', authMiddleware, userRolesMiddleware([APP_ROLE_EDIT_TASKS]), checkTasksIdValid, validateTasksPayload, updateTaskPayloadByIdController);
router.put('/tasks/:taskId/status', authMiddleware, userRolesMiddleware([APP_ROLE_EDIT_TASKS]), checkTasksIdValid, validateTasksStatus, updateTaskStatusByIdController);

router.delete('/tasks/:taskId', authMiddleware, userRolesMiddleware([APP_ROLE_DELETE_TASKS]), checkTasksIdValid, deleteTaskPayloadByIdController);

export default router;

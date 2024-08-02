/** @format */

import Joi from 'joi';
import { TASKS_PRIORITY_HIGH, TASKS_PRIORITY_LOW, TASKS_PRIORITY_MEDIUM } from '../constants/tasks';

export const tasksPayloadSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  descriptions: Joi.string().min(3).max(150).optional(),

  priority: Joi.string().allow('', null).valid(TASKS_PRIORITY_LOW, TASKS_PRIORITY_MEDIUM, TASKS_PRIORITY_HIGH).optional(),

  assignee: Joi.string().allow('', null).optional(),
}).required();

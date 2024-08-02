/** @format */

import Joi from 'joi';
import _ from 'underscore';

import type { Request, Response, NextFunction } from 'express';
import { validationHttpExpection } from '../utils/http-expections-errors';

import { getTaskByIdServices } from '../services/tasks.service';

import { TASKS_PRIORITY_HIGH, TASKS_PRIORITY_LOW, TASKS_PRIORITY_MEDIUM, TASKS_STATUS_TODO, TASKS_STATUS_HOLD, TASKS_STATUS_IN_PROGRESS, TASKS_STATUS_DONE } from '../constants/tasks';

const tasksStatusSchema = Joi.object({
  status: Joi.string().allow('', null).valid(TASKS_STATUS_TODO, TASKS_STATUS_HOLD, TASKS_STATUS_IN_PROGRESS, TASKS_STATUS_DONE).required(),
}).required();

const tasksPayloadSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  descriptions: Joi.string().min(3).max(150).optional(),

  priority: Joi.string().allow('', null).valid(TASKS_PRIORITY_LOW, TASKS_PRIORITY_MEDIUM, TASKS_PRIORITY_HIGH).optional(),

  assignee: Joi.string().allow('', null).optional(),
}).required();

export const validateTasksPayload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await tasksPayloadSchema.validateAsync(req.body);
  } catch (err: any) {
    const payload = validationHttpExpection(err.message);
    return next(payload);
  }
  next();
};

export const validateTasksStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await tasksStatusSchema.validateAsync(req.body);
  } catch (err: any) {
    const payload = validationHttpExpection(err.message);
    return next(payload);
  }
  next();
};

export const checkTasksIdValid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    const tasks = await getTaskByIdServices(taskId);

    if (_.isEmpty(tasks)) {
      throw new Error('Invalid TaskId');
    }
  } catch (err: any) {
    const payload = validationHttpExpection(err.message);
    return next(payload);
  }
  next();
};

/** @format */

// types
import { FilterQuery } from 'mongoose';
import { CustomRequest } from '../types/global';
import { NextFunction, Response } from 'express';

// Services
import {
  createTasksService,
  deleteTaskByIdServices,
  getAllTasksServices,
  getTaskByIdServices,
  getTaskLogsByIdServices,
  updateTaskByIdServices,
  updateTaskStatusByIdServices,
} from '../services/tasks.service';

// Utils
import { internalServerErrorHttpExpection } from '../utils/http-expections-errors';
import { TasksType } from '../models/tasks.model';

export const createTaskContoller = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const taskPayload = req.body;

    const reporterId = req.user?.userId;

    const taskId = await createTasksService(taskPayload, reporterId!);

    res.status(201).send({
      message: 'Successfully Created',
      taskId,
    });
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const getAllTaskController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const filters: FilterQuery<TasksType> = {
      isDeleted: { $ne: true },
    };

    if (req.query?.status && req.query.status !== 'ALL') {
      filters.status = req.query?.status;
    }

    const limit = req.query?.limit || 30;
    const offset = req.query?.offset || 0;

    const tasks = await getAllTasksServices(filters, Number(limit), Number(offset));
    res.send(tasks);
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const getTaskByIdController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    const tasks = await getTaskByIdServices(taskId);
    res.send(tasks);
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const getTaskLogsByIdController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;

    const limit = req.query?.limit || 30;
    const offset = req.query?.offset || 0;

    const tasks = await getTaskLogsByIdServices(taskId, Number(limit), Number(offset));
    res.send(tasks);
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const updateTaskPayloadByIdController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    await updateTaskByIdServices(taskId, req.body, req.user!);
    res.send({
      message: 'Successfully update',
    });
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const updateTaskStatusByIdController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    await updateTaskStatusByIdServices(taskId, req.body.status, req.user!);
    res.send({
      message: 'Successfully update status',
    });
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const deleteTaskPayloadByIdController = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    await deleteTaskByIdServices(taskId, req.user!);

    res.send({
      message: 'Successfully delete',
    });
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

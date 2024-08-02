/** @format */

import * as UUID from 'uuid';

import { FilterQuery } from 'mongoose';

import { TasksStatusType, TasksType } from '../models/tasks.model';
import { TaskLogsModal, TasksModal } from '../models/index.model';
import { UserInfoType } from '../types/user';
import { TASKS_STATUS_TODO } from '../constants/tasks';

export const createTasksService = async (taskPayload: Partial<TasksType>, reporterId: string) => {
  const taskId = UUID.v4();

  const tasks: Partial<TasksType> = {
    taskId,

    title: taskPayload.title,
    descriptions: taskPayload.descriptions,
    priority: taskPayload.priority,
    assignee: taskPayload.assignee,

    status: TASKS_STATUS_TODO,

    reporter: reporterId,
  };

  await TasksModal.create({ ...tasks });

  await TaskLogsModal.create({ ...tasks, actionPerforedBy: reporterId, actionTaken: 'CREATE_TASKS' });

  return taskId;
};

export const getAllTasksServices = async (filters: FilterQuery<TasksType>, limit: number, offset: number) => {
  const [data, count] = await Promise.all([TasksModal.find(filters).limit(limit).skip(offset).sort({ createdAt: 'desc' }), TasksModal.countDocuments(filters)]);

  return { data, count };
};

export const getTaskByIdServices = async (taskId: string) => {
  return TasksModal.findOne({ taskId });
};

export const getTaskLogsByIdServices = async (taskId: string, limit: number, offset: number) => {
  const [data, count] = await Promise.all([TaskLogsModal.find({ taskId }).limit(limit).skip(offset).sort({ createdAt: 'desc' }), TaskLogsModal.countDocuments({ taskId })]);
  return { data, count };
};

export const updateTaskByIdServices = async (taskId: string, taskPayload: Partial<TasksType>, user: UserInfoType) => {
  const tasks: Partial<TasksType> = {
    title: taskPayload.title,
    descriptions: taskPayload.descriptions,
    priority: taskPayload.priority,
    assignee: taskPayload.assignee,
  };

  await TasksModal.updateOne({ taskId }, { $set: { ...tasks } });

  await TaskLogsModal.create({ ...tasks, taskId, actionPerforedBy: user.userId, actionTaken: 'UPDATE_TASKS_PAYLOAD' });
};

export const deleteTaskByIdServices = async (taskId: string, user: UserInfoType) => {
  await TasksModal.updateOne({ taskId }, { $set: { isDeleted: true, deletedAt: new Date().toISOString() } });
  await TaskLogsModal.create({ taskId, actionPerforedBy: user.userId, actionTaken: 'DELETE_TASKS' });
};

export const updateTaskStatusByIdServices = async (taskId: string, status: TasksStatusType, user: UserInfoType) => {
  await TasksModal.updateOne({ taskId }, { $set: { status } });
  await TaskLogsModal.create({ taskId, status, actionPerforedBy: user.userId, actionTaken: 'UPDATE_TASKS_STATUS' });
};

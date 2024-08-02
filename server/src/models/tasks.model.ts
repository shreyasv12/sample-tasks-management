/** @format */

import mongoose from 'mongoose';

import { TASKS_PRIORITY_HIGH, TASKS_PRIORITY_LOW, TASKS_PRIORITY_MEDIUM, TASKS_STATUS_TODO, TASKS_STATUS_HOLD, TASKS_STATUS_IN_PROGRESS, TASKS_STATUS_DONE } from '../constants/tasks';

export type TasksStatusType = typeof TASKS_STATUS_TODO | typeof TASKS_STATUS_HOLD | typeof TASKS_STATUS_IN_PROGRESS | typeof TASKS_STATUS_DONE;
export type TasksPriorityType = typeof TASKS_PRIORITY_HIGH | typeof TASKS_PRIORITY_LOW | typeof TASKS_PRIORITY_MEDIUM;

export type TasksType = {
  taskId: string;

  title: string;
  descriptions: string;

  priority: TasksPriorityType;

  assignee: string;
  reporter: string;

  status: TasksStatusType;

  isDeleted?: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updateAt: Date;
};

export const TasksSchema = new mongoose.Schema<TasksType>(
  {
    taskId: { type: String, unique: true },

    title: String,
    descriptions: String,
    priority: String,
    assignee: String,

    isDeleted: Boolean,
    deletedAt: String,

    status: String,

    reporter: String,
  },
  {
    timestamps: true,
  },
);

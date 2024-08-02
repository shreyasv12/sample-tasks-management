/** @format */

import mongoose from 'mongoose';

import { TasksPriorityType, TasksStatusType } from './tasks.model';

export type TasksLogsType = {
  taskId: string;

  title: string;
  descriptions: string;
  priority: TasksPriorityType;

  assignee: string;
  reporter: string;

  status: TasksStatusType;

  isDeleted?: boolean;
  deletedAt?: Date;

  actionPerforedBy: string;
  actionTaken: string;

  createdAt: Date;
  updateAt: Date;
};

export const TasksLogsSchema = new mongoose.Schema<TasksLogsType>(
  {
    taskId: String,

    title: String,
    descriptions: String,
    priority: String,
    assignee: String,

    status: String,

    actionPerforedBy: String,
    actionTaken: String,

    isDeleted: String,
    deletedAt: String,

    reporter: String,
  },
  {
    timestamps: true,
  },
);

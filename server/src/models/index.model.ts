/** @format */

import mongoose from 'mongoose';

import config from '../config/config';

import { TasksSchema } from './tasks.model';
import { TasksLogsSchema } from './tasks-logs.model';

mongoose.connect(config.mongoDB.host!).then(() => console.log('MongoDB Connected!'));

export const TasksModal = mongoose.model('tasks', TasksSchema);
export const TaskLogsModal = mongoose.model('tasksLogs', TasksLogsSchema);

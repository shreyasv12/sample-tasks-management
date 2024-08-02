/** @format */

import { TasksType } from '../types/tasks';
import AxiosInstance from './index';

export const createTasks = async (tasksPayload: TasksType) => {
  const res = await AxiosInstance({
    url: '/tasks',
    method: 'POST',
    data: tasksPayload,
  });

  return res.data || {};
};

export const updateTasks = async (taskId: string, tasksPayload: TasksType) => {
  const res = await AxiosInstance({
    url: `/tasks/${taskId}`,
    method: 'PUT',
    data: tasksPayload,
  });

  return res.data || {};
};

export const updateTasksStatus = async (taskId: string, status: string) => {
  const res = await AxiosInstance({
    url: `/tasks/${taskId}/status`,
    method: 'PUT',
    data: {
      status,
    },
  });

  return res.data || {};
};

export const deleteTasks = async (taskId: string) => {
  const res = await AxiosInstance({
    url: `/tasks/${taskId}`,
    method: 'DELETE',
  });

  return res.data || {};
};

export const getAllTasks = async (filters: Partial<TasksType>, limit: number, offset: number) => {
  const res = await AxiosInstance({
    url: '/tasks',
    method: 'GET',
    params: {
      ...filters,
      limit,
      offset,
    },
  });

  return res.data || {};
};

export const getTasksById = async (taskId: string) => {
  const res = await AxiosInstance({
    url: `/tasks/${taskId}`,
    method: 'GET',
  });

  return res.data || {};
};

export const getTasksLogsById = async (taskId: string, limit: number, offset: number) => {
  const res = await AxiosInstance({
    url: `/tasks/${taskId}/logs`,
    method: 'GET',
    params: {
      limit,
      offset,
    },
  });

  return res.data || {};
};

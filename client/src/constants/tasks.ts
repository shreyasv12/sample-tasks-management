/** @format */

export const TASKS_PRIORITY_LOW = 'LOW';
export const TASKS_PRIORITY_MEDIUM = 'MEDIUM';
export const TASKS_PRIORITY_HIGH = 'HIGH';

export const TASKS_STATUS_TODO = 'TODO';
export const TASKS_STATUS_HOLD = 'HOLD';
export const TASKS_STATUS_IN_PROGRESS = 'IN_PROGRESS';
export const TASKS_STATUS_DONE = 'DONE';

export const TasksPriorityOptions = [
  {
    label: 'High',
    value: TASKS_PRIORITY_HIGH,
  },
  {
    label: 'Medium',
    value: TASKS_PRIORITY_MEDIUM,
  },
  {
    label: 'Low',
    value: TASKS_PRIORITY_LOW,
  },
];

export const TasksStatusOptions = [
  {
    label: 'Todo',
    value: TASKS_STATUS_TODO,
  },
  {
    label: 'Hold',
    value: TASKS_STATUS_HOLD,
  },
  {
    label: 'In Progress',
    value: TASKS_STATUS_IN_PROGRESS,
  },
  {
    label: 'Done',
    value: TASKS_STATUS_DONE,
  },
];

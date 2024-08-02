/** @format */

import { APP_ADMIN, APP_CREATE_TASKS, APP_EDIT_TASKS, APP_DELETE_TASKS } from './../constants/user-roles';

export type UserRolesType = typeof APP_ADMIN | typeof APP_CREATE_TASKS | typeof APP_EDIT_TASKS | typeof APP_DELETE_TASKS;

export interface UserInfoType {
  sessionId: string;

  userId: string;
  username: string;
  password?: string;
  roles: UserRolesType[];
}

/** @format */

import { APP_ROLE_ADMIN, APP_ROLE_CREATE_TASKS, APP_ROLE_EDIT_TASKS, APP_ROLE_DELETE_TASKS } from './../constants/user-roles';

export type UserRolesType = typeof APP_ROLE_ADMIN | typeof APP_ROLE_CREATE_TASKS | typeof APP_ROLE_EDIT_TASKS | typeof APP_ROLE_DELETE_TASKS;

export interface UserInfoType {
  userId: string;
  username: string;
  password?: string;
  roles: UserRolesType[];
}

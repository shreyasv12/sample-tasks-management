import { ADMIN, CREATE_TASKS, EDIT_TASKS, UPDATE_TASKS, DELETE_TASKS, } from './../constants/user-roles';

export type UserRolesType = typeof ADMIN | typeof CREATE_TASKS | typeof EDIT_TASKS | typeof UPDATE_TASKS | typeof DELETE_TASKS;

export interface UserInfoType {
  username: string;
  password?: string;
  roles: UserRolesType[];
}

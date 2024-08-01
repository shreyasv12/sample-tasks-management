/** @format */

import _ from 'underscore';
import { UserInfoType } from '../types/user';

export const getUserSession = () => {
  let userSession: UserInfoType = {} as UserInfoType;
  try {
    userSession = JSON.parse(localStorage.getItem('userSession') || '');
  } catch (err) {
    console.error('err', err);
  }
  return userSession;
};

export const checkUserHasPermission = (userRoles: string[]) => {
  const userSession = getUserSession();

  return _.isEmpty(userRoles) || (!_.isEmpty(userSession.roles) && userSession.roles?.some((ele) => userRoles.includes(ele)));
};

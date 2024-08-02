/** @format */

import _ from 'underscore';

// Types
import { UserInfoType, UserRolesType } from '../types/user';
import { CustomRequest } from '../types/global';
import { NextFunction, Response } from 'express';

// utils
import { verifyJWTToken } from '../utils/jwt';
import { forbiddenHttpExpection, unauthorizedHttpExpection } from '../utils/http-expections-errors';
import { APP_ROLE_ADMIN } from '../constants/user-roles';

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;
  if (_.isEmpty(apiKey)) {
    next(unauthorizedHttpExpection('API key is required'));
  }

  let userInfo = null;

  try {
    userInfo = await verifyJWTToken(apiKey);
  } catch (err) {
    next(unauthorizedHttpExpection('Invalid api key'));
  }

  if (_.isEmpty(userInfo)) {
    next(unauthorizedHttpExpection('Invalid api key'));
  }

  req.user = userInfo as UserInfoType;

  return next();
};

export const userRolesMiddleware = (roles: UserRolesType[]) => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const userRoles = req.user?.roles;

  if (_.isEmpty(userRoles) || (!_.isEmpty(roles) && !userRoles?.some((item) => roles.includes(item) || item === APP_ROLE_ADMIN))) {
    next(forbiddenHttpExpection());
  }

  return next();
};

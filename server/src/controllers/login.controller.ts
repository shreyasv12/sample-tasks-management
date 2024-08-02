/** @format */

import _ from 'underscore';

// types
import type { NextFunction, Request, Response } from 'express';

// services
import { validationUserCreds, createUserSession, getAllUsersService } from '../services/login.service';

// utils
import { internalServerErrorHttpExpection, invalidUserCredsHttpExpection } from '../utils/http-expections-errors';
import { CustomRequest } from '../types/global';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const userInfo = await validationUserCreds(username, password);

    if (_.isEmpty(userInfo)) {
      next(invalidUserCredsHttpExpection());
    }

    console.log('userInfouserInfo', userInfo);

    delete userInfo?.password;

    const userToken = await createUserSession(userInfo!);

    return res.send({
      sessionId: userToken,
      message: 'Successfully loggedin',
    });
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    return res.send(users);
  } catch (err: any) {
    next(internalServerErrorHttpExpection(err?.message));
  }
};

export const loggedInContoller = async (req: CustomRequest, res: Response) => {
  return res.send(req.user);
};

import { UserInfoType } from './user';
import { Request } from 'express';

declare namespace Express {
  export interface Request {
    userInfo?: any
  }
}

// Types
import { Request } from 'express';
import { UserInfoType } from './user';

export interface CustomRequest extends Request {
  user?: UserInfoType // or any other type
}

import Joi from 'joi';

import type { Request, Response, NextFunction } from 'express';
import { validationHttpExpection } from '../utils/http-expections-errors';

const loginApiSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
}).required();

export const validateLoginCreds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginApiSchema.validateAsync(req.body);
  } catch (err: any) {
    const payload = validationHttpExpection(err.message);
    return next(payload);
  }

  next();
};

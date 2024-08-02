/** @format */

import Joi from 'joi';

export const loginCredsSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
}).required();

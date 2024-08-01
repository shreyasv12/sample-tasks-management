import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateJWTToken = (payload: any) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

export const verifyJWTToken = (apiKey: string) => {
  return jwt.verify(apiKey, config.jwt.secret);
};

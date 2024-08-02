/** @format */

import { HTTP_STATUS_CODE } from '../constants/http-status-code';

export const validationHttpExpection = (errorMessage: string) => {
  const error: any = new Error(errorMessage);
  error.errorCode = 'VALIDATION_ERROR';
  error.statusCode = HTTP_STATUS_CODE.NOT_ACCEPTABLE;
  error.errorMessage = errorMessage;
  return error;
};

export const invalidUserCredsHttpExpection = () => {
  const errorMessage = 'User does not exist or invalid creds';
  const error: any = new Error(errorMessage);
  error.errorCode = 'USER_NOT_FOUND';
  error.statusCode = HTTP_STATUS_CODE.UNAUTHORIZED;
  error.errorMessage = errorMessage;
  return error;
};

export const internalServerErrorHttpExpection = (errorMessage: string) => {
  const error: any = new Error(errorMessage);
  error.errorCode = 'INTERNAL_SERVER_ERROR';
  error.statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  error.errorMessage = errorMessage;
  return error;
};

export const unauthorizedHttpExpection = (errorMessage: string) => {
  const error: any = new Error(errorMessage);
  error.errorCode = 'UNAUTHORIZED';
  error.statusCode = HTTP_STATUS_CODE.UNAUTHORIZED;
  error.errorMessage = errorMessage;
  return error;
};

export const forbiddenHttpExpection = () => {
  const errorMessage = 'User does not have access to perform this opertation';
  const error: any = new Error(errorMessage);
  error.errorCode = 'FORBIDDEN';
  error.statusCode = HTTP_STATUS_CODE.FORBIDDEN;
  error.errorMessage = errorMessage;
  return error;
};

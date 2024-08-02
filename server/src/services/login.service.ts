/** @format */

// types
import { UserInfoType } from '../types/user';

// utils
import { generateJWTToken } from '../utils/jwt';
import { getPasswordHash } from '../utils/hasher';

// constants
import UserData from './../constants/user-creds.json';

export const validationUserCreds = async (username: string, password: string): Promise<UserInfoType | undefined> => {
  const hashPassword = await getPasswordHash(password);

  console.log('scasckjansdkcjasdnkjcs', hashPassword, username);

  return (JSON.parse(JSON.stringify(UserData)) as any).find((item: UserInfoType) => item.username === username && item.password === hashPassword);
};

export const getAllUsersService = async () => {
  return (UserData as any).map((item: UserInfoType) => {
    return { userId: item.userId, username: item.username };
  });
};

export const createUserSession = async (userInfo: UserInfoType) => {
  const sessionToken = await generateJWTToken(userInfo);
  return sessionToken;
};

/** @format */

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as _ from 'underscore';

import { UserInfoType } from '../types/user';

import { getUserSession } from '../utils/user-session';

export interface UserSessionProviderContextType {
  userSession: UserInfoType;
  handleClearUserSession: () => void;
  handleUpdateUserSession: (session: UserInfoType, isLogin?: boolean) => void;
}

const defaultValue: UserSessionProviderContextType = {
  userSession: {} as UserInfoType,
  handleClearUserSession: console.info,
  handleUpdateUserSession: console.info,
};

export const UserSessionContext = React.createContext(defaultValue);

interface UserSessionProviderProps {
  children: any;
}

const UserSessionProvider: React.FC<UserSessionProviderProps> = (props) => {
  const [userSession, setUserSession] = React.useState<UserInfoType>({} as UserInfoType);

  const navigate = useNavigate();

  React.useEffect(() => {
    const session = getUserSession();
    setUserSession(session);
  }, []);

  const handleClearUserSession = () => {
    localStorage.setItem('userSession', JSON.stringify({}));
    setUserSession({} as UserInfoType);
  };

  const handleUpdateUserSession = (session: UserInfoType, isLogin = true) => {
    if (_.isEmpty(session.roles) && !isLogin) {
      navigate('/no-access');
      return;
    }

    localStorage.setItem('userSession', JSON.stringify(session));
    setUserSession(session);
  };

  const value = {
    userSession,
    handleClearUserSession,
    handleUpdateUserSession,
  };

  return <UserSessionContext.Provider value={value}>{props.children}</UserSessionContext.Provider>;
};

export default UserSessionProvider;

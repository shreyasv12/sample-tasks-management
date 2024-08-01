/** @format */

import * as React from 'react';
import * as _ from 'underscore';
import { Navigate, useLocation } from 'react-router-dom';

import CustomLoading from './components/common/CustomLoading';

import { getUserSession } from './utils/user-session';

import { UserInfoType } from './types/user';

export interface PrivateAuthProps {
  children: JSX.Element;
}

const PrivateAuth: React.FunctionComponent<PrivateAuthProps> = (props) => {
  const location = useLocation();

  const [isMount, setIsMount] = React.useState<boolean>(false);
  const [auth, setAuth] = React.useState<UserInfoType>({} as UserInfoType);

  React.useEffect(() => {
    const userSession = getUserSession();
    setAuth(userSession);
    setIsMount(true);
  }, []);

  if (!isMount) {
    return <CustomLoading />;
  }

  if (_.isEmpty(auth.sessionId)) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return props.children;
};

export default PrivateAuth;

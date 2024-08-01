/** @format */

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserSessionContext } from './context/UserSession';

import AxiosInstance from './services/index';

import { getUserSession } from './utils/user-session';

interface InitialComponentProps {}

const InitialComponent: React.FunctionComponent<InitialComponentProps> = () => {
  const navigate = useNavigate();

  const { userSession, handleClearUserSession } = React.useContext(UserSessionContext);

  React.useEffect(() => {
    AxiosInstance.interceptors.request.use(
      (req: any) => {
        const userSession = getUserSession();
        if (userSession.sessionId) {
          req.headers['x-api-key'] = userSession.sessionId;
        }
        return req;
      },
      (error) => {
        console.error('ERROR in axios interceptor', error);
        return Promise.reject(error);
      },
    );

    AxiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error && error.response && error?.response?.status === 401) {
          handleClearUserSession();
          navigate('login');
        }

        return Promise.reject(error);
      },
    );
  }, [userSession]);

  return null;
};

export default InitialComponent;

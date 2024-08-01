/** @format */

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import CustomLoading from '../../components/common/CustomLoading';

import { UserSessionContext } from '../../context/UserSession';

import { getUserSession } from '../../utils/user-session';

import { fetchUserLoggedInInfo } from './../../services/login';

interface LoginSuccessProps {}

const LoginSuccess: React.FunctionComponent<LoginSuccessProps> = () => {
  const { handleUpdateUserSession } = React.useContext(UserSessionContext);

  const navigate = useNavigate();

  const getUserSessionInfo = async () => {
    const userSession = getUserSession();
    try {
      const data = await fetchUserLoggedInInfo(userSession.sessionId);
      handleUpdateUserSession({ ...data, sessionId: userSession.sessionId }, false);
      navigate('/');
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  React.useEffect(() => {
    getUserSessionInfo();
  }, []);

  return <CustomLoading />;
};

export default LoginSuccess;

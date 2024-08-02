/** @format */

import * as React from 'react';
import { Navigate, Outlet, useLocation, Location } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useQuery } from '@tanstack/react-query';
import { UserSessionContext } from '../../context/UserSession';
import { getUserSession } from '../../utils/user-session';
import { fetchUserLoggedInInfo } from '../../services/login';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
  const location: Location = useLocation();

  const { userSession, handleUpdateUserSession } = React.useContext(UserSessionContext);

  useQuery({
    queryKey: ['fetchUserSession', userSession.sessionId],
    queryFn: async () => {
      const userSession = getUserSession();
      if (userSession && userSession.sessionId) {
        const user = await fetchUserLoggedInInfo(userSession.sessionId);
        localStorage.setItem('userSession', JSON.stringify(user));
        handleUpdateUserSession({ ...user, sessionId: userSession.sessionId }, false);
        return user;
      }
    },
  });

  return (
    <Box sx={{ padding: '0 !important', height: 'calc(100% - 80px)' }}>
      <Box sx={{ display: 'flex', padding: 0 }}>
        <CssBaseline />
        <Box component='main' sx={{ flex: 1, flexGrow: 1, padding: '0 !important' }}>
          <Outlet />

          {location.pathname === '/' && <Navigate to='/tasks' />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

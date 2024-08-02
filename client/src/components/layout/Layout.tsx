/** @format */

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation, Location, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { UserSessionContext } from '../../context/UserSession';

import { fetchUserLoggedInInfo } from '../../services/login';

import { getUserSession } from '../../utils/user-session';
import _ from 'underscore';

interface LayoutProps { }

const Layout: React.FunctionComponent<LayoutProps> = () => {
  const location: Location = useLocation();
  const navigate = useNavigate();

  const { userSession, handleUpdateUserSession, handleClearUserSession } = React.useContext(UserSessionContext);

  const getUserDisplay = () => {
    const userName: string[] = userSession.username?.split(' ') || [''];
    return `${_.get(userName, ['0'], '')?.slice(0, 1)}${_.get(userName, ['1'], '')?.slice(0, 1) || ''}`;
  };

  const handleClickLogout = () => {
    handleClearUserSession();
    navigate('/login');
  };

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
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Tasks Management
          </Typography>
          <Grid item xs='auto' alignItems="center" gap={2}>
            <Avatar sx={{ textTransform: 'uppercase', display: { xs: 'none', md: 'flex' } }}>
              {getUserDisplay()}
            </Avatar>
            <Typography
              textTransform='capitalize'
              variant='fontSemiBold18'
              component='div'
              sx={{
                marginRight: '5px',
                display: 'inline-block',
                width: '120px',
                whiteSpace: 'nowrap',
                overflow: 'hidden !important',
                textOverflow: 'ellipsis',
              }}>
              {userSession.username}
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <IconButton onClick={handleClickLogout}><PowerSettingsNewIcon /></IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

        <Outlet />
        {location.pathname === '/' && <Navigate to='/tasks' />}
      </Box>
    </Box>
  );
};

export default Layout;

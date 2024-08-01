import * as React from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

interface LayoutProps {

}

const Layout: React.FunctionComponent<LayoutProps> = () => {
  return (
    <Box sx={{ padding: '0 !important', height: 'calc(100% - 80px)' }}>
      <Box sx={{ display: 'flex', padding: 0 }}>
        <CssBaseline />
        <Box component='main' sx={{ flex: 1, flexGrow: 1, padding: '0 !important' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

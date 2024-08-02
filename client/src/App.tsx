/** @format */

// Library
import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import { HashRouter, useRoutes } from 'react-router-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import InitialComponent from './InitialComponent';
import CustomToastContext from './context/CustomToast';

// App Routes
import { NavRoutes } from './_navigation.routes';

// App Theme
import { appTheme } from './context/AppTheme';
import UserSessionProvider from './context/UserSession';

interface AppProps {}

const HomeApp: React.FunctionComponent<AppProps> = () => {
  return useRoutes(NavRoutes);
};

const AppWrapper: React.FunctionComponent<AppProps> = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retryDelay: 5000, retry: 3, refetchOnWindowFocus: false } } });

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CustomToastContext>
            <HashRouter>
              <UserSessionProvider>
                <HomeApp />
                <InitialComponent />
              </UserSessionProvider>
            </HashRouter>
          </CustomToastContext>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;

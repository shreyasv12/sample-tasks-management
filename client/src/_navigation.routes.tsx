/** @format */

// Library
import { lazy, Suspense } from 'react';

// Types
import { RouteObject } from 'react-router-dom';

// Components
import PrivateAuth from './PrivateAuth';

import CustomLoading from './components/common/CustomLoading';

const Layout = lazy(() => import('./components/layout/Layout'));

const Login = lazy(() => import('./pages/login/login'));
const LoginSuccess = lazy(() => import('./pages/login/LoginSuccess'));

const Page404 = lazy(() => import('./pages/Page404'));
const NoAccessPage = lazy(() => import('./pages/NoAccessPage'));

export const NavRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<CustomLoading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/login-success',
    element: (
      <Suspense fallback={<CustomLoading />}>
        <LoginSuccess />
      </Suspense>
    ),
  },
  {
    path: '/no-access',
    element: (
      <Suspense fallback={<CustomLoading />}>
        <NoAccessPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<CustomLoading />}>
        <PrivateAuth>
          <Layout />
        </PrivateAuth>
      </Suspense>
    ),
    children: [
      {
        path: '*',
        element: (
          <Suspense fallback={<CustomLoading />}>
            <Page404 />
          </Suspense>
        ),
      },
    ],
  },
];

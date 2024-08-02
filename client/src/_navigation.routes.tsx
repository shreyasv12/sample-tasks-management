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
const Tasks = lazy(() => import('./pages/tasks/Tasks'));
const TasksDetails = lazy(() => import('./pages/tasks/TasksDetails'));
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
        path: '/tasks',
        element: (
          <Suspense fallback={<CustomLoading />}>
            <Tasks />
          </Suspense>
        ),
      },
      {
        path: '/tasks/:taskId',
        element: (
          <Suspense fallback={<CustomLoading />}>
            <TasksDetails />
          </Suspense>
        ),
      },
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

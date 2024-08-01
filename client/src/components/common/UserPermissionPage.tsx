/** @format */

import * as React from 'react';

import NoAccessPage from '../../pages/NoAccessPage';

import { checkUserHasPermission } from './../../utils/user-session';

interface UserPermissionPageProps {
  children: any;
  roles: string[];
  showNoAccessMessage?: boolean;
}

const UserPermissionPage: React.FunctionComponent<UserPermissionPageProps> = (props) => {
  const userHasPermission = checkUserHasPermission(props.roles);

  if (userHasPermission) {
    return props.children;
  }

  if (props.showNoAccessMessage) {
    return <NoAccessPage />;
  }

  return null;
};

UserPermissionPage.defaultProps = {
  showNoAccessMessage: true,
};

export default UserPermissionPage;

import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { Fragment, useCallback, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Config } from '../../contexts/Config';
import User from './User';
import UserAdd from './UserAdd/UserAdd';
import UsersList from './UserList/UserList';

function Users({ i18n }) {
  const [breadcrumbConfig, setBreadcrumbConfig] = useState({
    '/users': i18n._(t`Users`),
    '/users/add': i18n._(t`Create New User`),
  });
  const match = useRouteMatch();

  const addUserBreadcrumb = useCallback(
    (user) => {
      if (!user) {
        return;
      }

      setBreadcrumbConfig({
        '/users': i18n._(t`Users`),
        '/users/add': i18n._(t`Create New User`),
        [`/users/${user.id}`]: `${user.username}`,
        [`/users/${user.id}/edit`]: i18n._(t`Edit Details`),
        [`/users/${user.id}/details`]: i18n._(t`Details`),
        [`/users/${user.id}/access`]: i18n._(t`Access`),
        [`/users/${user.id}/teams`]: i18n._(t`Teams`),
        [`/users/${user.id}/organizations`]: i18n._(t`Organizations`),
        [`/users/${user.id}/tokens`]: i18n._(t`Tokens`),
      });
    },
    [i18n]
  );
  return (
    <Fragment>
      <Breadcrumbs breadcrumbConfig={breadcrumbConfig} />
      <Switch>
        <Route path={`${match.path}/add`}>
          <UserAdd />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Config>
            {({ me }) => (
              <User setBreadcrumb={addUserBreadcrumb} me={me || {}} />
            )}
          </Config>
        </Route>
        <Route path={`${match.path}`}>
          <UsersList />
        </Route>
      </Switch>
    </Fragment>
  );
}

export { Users as _Users };
export default withI18n()(Users);

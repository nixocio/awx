import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { useCallback, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs';
import Application from './Application';
import ApplicationAdd from './ApplicationAdd';
import ApplicationsList from './ApplicationsList';

function Applications({ i18n }) {
  const [breadcrumbConfig, setBreadcrumbConfig] = useState({
    '/applications': i18n._(t`Applications`),
    '/applications/add': i18n._(t`Create New Application`),
  });

  const buildBreadcrumbConfig = useCallback(
    (application) => {
      if (!application) {
        return;
      }
      setBreadcrumbConfig({
        '/applications': i18n._(t`Applications`),
        '/applications/add': i18n._(t`Create New Application`),
        [`/applications/${application.id}`]: `${application.name}`,
        [`/applications/${application.id}/edit`]: i18n._(t`Edit Details`),
        [`/applications/${application.id}/details`]: i18n._(t`Details`),
        [`/applications/${application.id}/tokens`]: i18n._(t`Tokens`),
      });
    },
    [i18n]
  );

  return (
    <>
      <Breadcrumbs breadcrumbConfig={breadcrumbConfig} />
      <Switch>
        <Route path="/applications/add">
          <ApplicationAdd />
        </Route>
        <Route path="/applications/:id">
          <Application setBreadcrumb={buildBreadcrumbConfig} />
        </Route>
        <Route path="/applications">
          <ApplicationsList />
        </Route>
      </Switch>
    </>
  );
}

export default withI18n()(Applications);

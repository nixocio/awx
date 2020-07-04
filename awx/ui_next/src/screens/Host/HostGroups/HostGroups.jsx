import { withI18n } from '@lingui/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HostGroupsList from './HostGroupsList';

function HostGroups({ host }) {
  return (
    <Switch>
      <Route key="list" path="/hosts/:id/groups">
        <HostGroupsList host={host} />
      </Route>
    </Switch>
  );
}

export { HostGroups as _HostGroups };
export default withI18n()(HostGroups);

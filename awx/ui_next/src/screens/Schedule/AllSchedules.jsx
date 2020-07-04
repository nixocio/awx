import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { Card, PageSection } from '@patternfly/react-core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { SchedulesAPI } from '../../api';
import Breadcrumbs from '../../components/Breadcrumbs';
import { ScheduleList } from '../../components/Schedule';

function AllSchedules({ i18n }) {
  const loadScheduleOptions = () => {
    return SchedulesAPI.readOptions();
  };

  const loadSchedules = (params) => {
    return SchedulesAPI.read(params);
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbConfig={{
          '/schedules': i18n._(t`Schedules`),
        }}
      />
      <Switch>
        <Route path="/schedules">
          <PageSection>
            <Card>
              <ScheduleList
                loadSchedules={loadSchedules}
                loadScheduleOptions={loadScheduleOptions}
                hideAddButton
              />
            </Card>
          </PageSection>
        </Route>
      </Switch>
    </>
  );
}

export default withI18n()(AllSchedules);

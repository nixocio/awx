import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { UsersAPI } from '../../../api';
import PaginatedDataList from '../../../components/PaginatedDataList';
import { getQSConfig, parseQueryString } from '../../../util/qs';
import useRequest from '../../../util/useRequest';
import UserOrganizationListItem from './UserOrganizationListItem';

const QS_CONFIG = getQSConfig('organizations', {
  page: 1,
  page_size: 20,
  order_by: 'name',
  type: 'organization',
});

function UserOrganizationsList({ i18n }) {
  const location = useLocation();
  const { id: userId } = useParams();

  const {
    result: { organizations, count },
    error: contentError,
    isLoading,
    request: fetchOrgs,
  } = useRequest(
    useCallback(async () => {
      const params = parseQueryString(QS_CONFIG, location.search);
      const {
        data: { results, count: orgCount },
      } = await UsersAPI.readOrganizations(userId, params);
      return {
        organizations: results,
        count: orgCount,
      };
    }, [userId, location.search]),
    {
      organizations: [],
      count: 0,
    }
  );

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

  return (
    <PaginatedDataList
      items={organizations}
      contentError={contentError}
      hasContentLoading={isLoading}
      itemCount={count}
      pluralizedItemName={i18n._(t`Organizations`)}
      qsConfig={QS_CONFIG}
      renderItem={(organization) => (
        <UserOrganizationListItem
          key={organization.id}
          value={organization.name}
          organization={organization}
          detailUrl={`/organizations/${organization.id}/details`}
          onSelect={() => {}}
          isSelected={false}
        />
      )}
    />
  );
}

export default withI18n()(UserOrganizationsList);

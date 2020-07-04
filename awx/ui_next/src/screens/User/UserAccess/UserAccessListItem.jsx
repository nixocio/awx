import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import {
  Chip,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from '@patternfly/react-core';
import React from 'react';
import { Link } from 'react-router-dom';

import DataListCell from '../../../components/DataListCell';
import { Detail, DetailList } from '../../../components/DetailList';

function UserAccessListItem({ role, i18n, detailUrl, onSelect }) {
  const labelId = `userRole-${role.id}`;
  return (
    <DataListItem key={role.id} aria-labelledby={labelId} id={`${role.id}`}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={[
            <DataListCell key="name" aria-label={i18n._(t`resource name`)}>
              <Link to={`${detailUrl}`} id={labelId}>
                <b>{role.summary_fields.resource_name}</b>
              </Link>
            </DataListCell>,
            <DataListCell key="type" aria-label={i18n._(t`resource type`)}>
              {role.summary_fields && (
                <DetailList stacked>
                  <Detail
                    label={i18n._(t`Type`)}
                    value={role.summary_fields.resource_type_display_name}
                  />
                </DetailList>
              )}
            </DataListCell>,
            <DataListCell key="role" aria-label={i18n._(t`resource role`)}>
              {role.name && (
                <DetailList stacked>
                  <Detail
                    label={i18n._(t`Role`)}
                    value={
                      <Chip
                        key={role.name}
                        aria-label={role.name}
                        onClick={() => onSelect(role)}
                        isReadOnly={
                          !role.summary_fields.user_capabilities.unattach
                        }
                      >
                        {role.name}
                      </Chip>
                    }
                  />
                </DetailList>
              )}
            </DataListCell>,
          ]}
        />
      </DataListItemRow>
    </DataListItem>
  );
}

export default withI18n()(UserAccessListItem);

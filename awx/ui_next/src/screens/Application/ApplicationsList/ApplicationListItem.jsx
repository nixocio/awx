import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import {
  Button,
  DataListCheck,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Tooltip,
  DataListAction as _DataListAction,
} from '@patternfly/react-core';
import { PencilAltIcon } from '@patternfly/react-icons';
import { bool, func, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DataListCell from '../../../components/DataListCell';
import { Application } from '../../../types';
import { formatDateString } from '../../../util/dates';

const DataListAction = styled(_DataListAction)`
  align-items: center;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 40px;
`;

const Label = styled.b`
  margin-right: 20px;
`;

function ApplicationListItem({
  application,
  isSelected,
  onSelect,
  detailUrl,
  i18n,
}) {
  const labelId = `check-action-${application.id}`;
  return (
    <DataListItem
      key={application.id}
      aria-labelledby={labelId}
      id={`${application.id}`}
    >
      <DataListItemRow>
        <DataListCheck
          id={`select-application-${application.id}`}
          checked={isSelected}
          onChange={onSelect}
          aria-labelledby={labelId}
        />
        <DataListItemCells
          dataListCells={[
            <DataListCell
              key="divider"
              aria-label={i18n._(t`application name`)}
            >
              <Link to={`${detailUrl}`}>
                <b>{application.name}</b>
              </Link>
            </DataListCell>,
            <DataListCell
              key="organization"
              aria-label={i18n._(t`organization name`)}
            >
              <Link
                to={`/organizations/${application.summary_fields.organization.id}`}
              >
                <b>{application.summary_fields.organization.name}</b>
              </Link>
            </DataListCell>,
            <DataListCell key="modified" aria-label={i18n._(t`last modified`)}>
              <Label>{i18n._(t`Last Modified`)}</Label>
              <span>{formatDateString(application.modified)}</span>
            </DataListCell>,
          ]}
        />
        <DataListAction
          aria-label="actions"
          aria-labelledby={labelId}
          id={labelId}
        >
          {application.summary_fields.user_capabilities.edit ? (
            <Tooltip content={i18n._(t`Edit application`)} position="top">
              <Button
                aria-label={i18n._(t`Edit application`)}
                variant="plain"
                component={Link}
                to={`/applications/${application.id}/edit`}
              >
                <PencilAltIcon />
              </Button>
            </Tooltip>
          ) : (
            ''
          )}
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
}

ApplicationListItem.propTypes = {
  application: Application.isRequired,
  detailUrl: string.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
};

export default withI18n()(ApplicationListItem);

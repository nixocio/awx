import React from 'react';
import { string, bool, func } from 'prop-types';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Link } from 'react-router-dom';
import 'styled-components/macro';
import {
  Badge as PFBadge,
  Progress as PFProgress,
  ProgressMeasureLocation,
  ProgressSize,
  Button,
  DataListAction as _DataListAction,
  DataListCheck,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  Tooltip,
} from '@patternfly/react-core';
import { PencilAltIcon } from '@patternfly/react-icons';
import styled from 'styled-components';

import DataListCell from '../../../components/DataListCell';
import { InstanceGroup } from '../../../types';

const Badge = styled(PFBadge)`
  margin-left: 8px;
`;

const ListGroup = styled.span`
  margin-left: 12px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const Progress = styled(PFProgress)`
  margin-left: 4px;
`;

const DataListAction = styled(_DataListAction)`
  align-items: center;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 40px;
`;

function InstanceGroupListItem({
  instanceGroup,
  detailUrl,
  isSelected,
  onSelect,
  i18n,
}) {
  const labelId = `check-action-${instanceGroup.id}`;

  const isAvailable = item => {
    return (
      (item.policy_instance_minimum || item.policy_instance_percentage) &&
      item.capacity
    );
  };

  const isContainerGroup = item => {
    return item.is_containerized;
  };
  return (
    <DataListItem
      key={instanceGroup.id}
      aria-labelledby={labelId}
      id={`${instanceGroup.id} `}
    >
      <DataListItemRow>
        <DataListCheck
          id={`select-instance-groups-${instanceGroup.id}`}
          checked={isSelected}
          onChange={onSelect}
          aria-labelledby={labelId}
        />

        <DataListItemCells
          dataListCells={[
            <DataListCell
              key="name"
              aria-label={i18n._(t`instance group name`)}
            >
              <span id={labelId}>
                <Link to={`${detailUrl}`}>
                  <b>{instanceGroup.name}</b>
                </Link>
              </span>
            </DataListCell>,

            <DataListCell
              key="type"
              aria-label={i18n._(t`instance group type`)}
            >
              <b css="margin-right: 24px">{i18n._(t`Type`)}</b>
              <span id={labelId}>
                {isContainerGroup(instanceGroup)
                  ? i18n._(t`Container group`)
                  : i18n._(t`Instance group`)}
              </span>
            </DataListCell>,
            <DataListCell
              key="related-field-counts"
              aria-label={i18n._(t`instance counts`)}
              width={2}
            >
              <ListGroup>
                <b>{i18n._(t`Running jobs`)}</b>
                <Badge isRead>{instanceGroup.jobs_running}</Badge>
              </ListGroup>
              <ListGroup>
                <b>{i18n._(t`Total jobs`)}</b>
                <Badge isRead>{instanceGroup.jobs_total}</Badge>
              </ListGroup>

              {!instanceGroup.is_containerized ? (
                <ListGroup>
                  <b>{i18n._(t`Instances`)}</b>
                  <Badge isRead>{instanceGroup.instances}</Badge>
                </ListGroup>
              ) : null}
            </DataListCell>,

            <DataListCell
              key="capacity"
              aria-label={i18n._(t`instance group used capacity`)}
            >
              {!isContainerGroup(instanceGroup) ? (
                isAvailable(instanceGroup) ? (
                  <Progress
                    value={100 - instanceGroup.percent_capacity_remaining}
                    measureLocation={ProgressMeasureLocation.top}
                    size={ProgressSize.sm}
                    title={i18n._(t`Capacity`)}
                  />
                ) : (
                  <span css="color: red">{i18n._(t`Unavailable`)}</span>
                )
              ) : null}
            </DataListCell>,
          ]}
        />
        <DataListAction
          aria-label="actions"
          aria-labelledby={labelId}
          id={labelId}
        >
          {instanceGroup.summary_fields.user_capabilities.edit && (
            <Tooltip content={i18n._(t`Edit instance group`)} position="top">
              <Button
                aria-label={i18n._(t`Edit instance group`)}
                variant="plain"
                component={Link}
                to={`/instance_groups/${instanceGroup.id}/edit`}
              >
                <PencilAltIcon />
              </Button>
            </Tooltip>
          )}
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
}
InstanceGroupListItem.prototype = {
  instanceGroup: InstanceGroup.isRequired,
  detailUrl: string.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
};

export default withI18n()(InstanceGroupListItem);

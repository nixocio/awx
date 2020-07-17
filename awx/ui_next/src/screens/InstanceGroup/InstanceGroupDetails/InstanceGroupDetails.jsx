import React, { useCallback } from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Link, useHistory } from 'react-router-dom';
import { Button, Badge as PFBadge } from '@patternfly/react-core';
import 'styled-components/macro';
import styled from 'styled-components';

import AlertModal from '../../../components/AlertModal';
import { CardBody, CardActionsRow } from '../../../components/Card';
import DeleteButton from '../../../components/DeleteButton';
import {
  Detail,
  DetailList,
  UserDateDetail,
  DetailBadge,
} from '../../../components/DetailList';
import useRequest, { useDismissableError } from '../../../util/useRequest';
import { InstanceGroupsAPI } from '../../../api';

function InstanceGroupDetails({ instanceGroup, i18n }) {
  const { id, name } = instanceGroup;

  const history = useHistory();

  const {
    request: deleteInstanceGroup,
    isLoading,
    error: deleteError,
  } = useRequest(
    useCallback(async () => {
      await InstanceGroupsAPI.destroy(id);
      history.push(`/instance_groups`);
    }, [id, history])
  );

  const { error, dismissError } = useDismissableError(deleteError);

  const isAvailable = item => {
    return (
      (item.policy_instance_minimum || item.policy_instance_percentage) &&
      item.capacity
    );
  };

  return (
    <CardBody>
      <DetailList>
        <Detail
          label={i18n._(t`Name`)}
          value={name}
          dataCy="instance-group-detail-name"
        />
        <Detail
          label={i18n._(t`Type`)}
          value={
            instanceGroup.is_containerized
              ? i18n._(t`Container group`)
              : i18n._(t`Instance group`)
          }
          dataCy="instance-group-type"
        />
        <DetailBadge
          label={i18n._(t`Policy instance minimum`)}
          dataCy="instance-group-policy-instance-minimum"
          content={instanceGroup.policy_instance_minimum}
        />
        <DetailBadge
          label={i18n._(t`Policy instance percentage`)}
          dataCy="instance-group-policy-instance-percentage"
          content={`${instanceGroup.policy_instance_percentage} %`}
        />
        {isAvailable(instanceGroup) ? (
          <DetailBadge
            label={i18n._(t`Used capacity`)}
            content={`${100 - instanceGroup.percent_capacity_remaining} %`}
            dataCy="instance-group-used-capacity"
          />
        ) : (
          <Detail
            label={i18n._(t`Used capacity`)}
            value={<span css="color: red">{i18n._(t`Unavailable`)}</span>}
            dataCy="instance-group-used-capacity"
          />
        )}

        <UserDateDetail
          label={i18n._(t`Created`)}
          date={instanceGroup.created}
          user={instanceGroup.summary_fields.created_by}
        />
        <UserDateDetail
          label={i18n._(t`Last Modified`)}
          date={instanceGroup.modified}
          user={instanceGroup.summary_fields.modified_by}
        />
      </DetailList>

      <CardActionsRow>
        {instanceGroup.summary_fields.user_capabilities &&
          instanceGroup.summary_fields.user_capabilities.edit && (
            <Button
              aria-label={i18n._(t`edit`)}
              component={Link}
              to={`/instance_groups/${id}/edit`}
            >
              {i18n._(t`Edit`)}
            </Button>
          )}
        {name !== 'tower' &&
          instanceGroup.summary_fields.user_capabilities &&
          instanceGroup.summary_fields.user_capabilities.delete && (
            <DeleteButton
              name={name}
              modalTitle={i18n._(t`Delete instance group`)}
              onConfirm={deleteInstanceGroup}
              isDisabled={isLoading}
            >
              {i18n._(t`Delete`)}
            </DeleteButton>
          )}
      </CardActionsRow>
      {error && (
        <AlertModal
          isOpen={error}
          onClose={dismissError}
          title={i18n._(t`Error`)}
          variant="error"
        />
      )}
    </CardBody>
  );
}

export default withI18n()(InstanceGroupDetails);

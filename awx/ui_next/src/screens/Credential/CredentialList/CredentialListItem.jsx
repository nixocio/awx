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
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CredentialsAPI } from '../../../api';
import CopyButton from '../../../components/CopyButton';
import DataListCell from '../../../components/DataListCell';
import { Credential } from '../../../types';
import { timeOfDay } from '../../../util/dates';

const DataListAction = styled(_DataListAction)`
  align-items: center;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 40px);
`;

function CredentialListItem({
  credential,
  detailUrl,
  isSelected,
  onSelect,
  i18n,
  fetchCredentials,
}) {
  const [isDisabled, setIsDisabled] = useState(false);

  const labelId = `check-action-${credential.id}`;
  const canEdit = credential.summary_fields.user_capabilities.edit;

  const copyCredential = useCallback(async () => {
    await CredentialsAPI.copy(credential.id, {
      name: `${credential.name} @ ${timeOfDay()}`,
    });
    await fetchCredentials();
  }, [credential.id, credential.name, fetchCredentials]);

  return (
    <DataListItem
      key={credential.id}
      aria-labelledby={labelId}
      id={`${credential.id}`}
    >
      <DataListItemRow>
        <DataListCheck
          isDisabled={isDisabled}
          id={`select-credential-${credential.id}`}
          checked={isSelected}
          onChange={onSelect}
          aria-labelledby={labelId}
        />
        <DataListItemCells
          dataListCells={[
            <DataListCell key="name">
              <Link to={`${detailUrl}`}>
                <b>{credential.name}</b>
              </Link>
            </DataListCell>,
            <DataListCell key="type">
              {credential.summary_fields.credential_type.name}
            </DataListCell>,
          ]}
        />
        <DataListAction
          aria-label="actions"
          aria-labelledby={labelId}
          id={labelId}
        >
          {canEdit && (
            <Tooltip content={i18n._(t`Edit Credential`)} position="top">
              <Button
                isDisabled={isDisabled}
                aria-label={i18n._(t`Edit Credential`)}
                variant="plain"
                component={Link}
                to={`/credentials/${credential.id}/edit`}
              >
                <PencilAltIcon />
              </Button>
            </Tooltip>
          )}
          {credential.summary_fields.user_capabilities.copy && (
            <CopyButton
              isDisabled={isDisabled}
              onLoading={() => setIsDisabled(true)}
              onDoneLoading={() => setIsDisabled(false)}
              copyItem={copyCredential}
              helperText={{
                tooltip: i18n._(t`Copy Credential`),
                errorMessage: i18n._(t`Failed to copy credential.`),
              }}
            />
          )}
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
}

CredentialListItem.propTypes = {
  detailUrl: string.isRequired,
  credential: Credential.isRequired,
  isSelected: bool.isRequired,
  onSelect: func.isRequired,
};

export default withI18n()(CredentialListItem);

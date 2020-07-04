import { Trans, t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { Button, ButtonVariant, Tooltip } from '@patternfly/react-core';
import { KeyIcon } from '@patternfly/react-icons';
import { func } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import CredentialChip from '../../../../../components/CredentialChip';
import { Credential } from '../../../../../types';

const SelectedCredential = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-bottom-color: var(--pf-global--BorderColor--200);
`;

const SpacedCredentialChip = styled(CredentialChip)`
  margin: 5px 8px;
`;

const PluginHelpText = styled.p`
  margin-top: 5px;
`;

function CredentialPluginSelected({
  i18n,
  credential,
  onEditPlugin,
  onClearPlugin,
}) {
  return (
    <>
      <SelectedCredential>
        <SpacedCredentialChip onClick={onClearPlugin} credential={credential} />
        <Tooltip
          content={i18n._(t`Edit Credential Plugin Configuration`)}
          position="top"
        >
          <Button
            aria-label={i18n._(t`Edit Credential Plugin Configuration`)}
            onClick={onEditPlugin}
            variant={ButtonVariant.control}
          >
            <KeyIcon />
          </Button>
        </Tooltip>
      </SelectedCredential>
      <PluginHelpText>
        <Trans>
          This field will be retrieved from an external secret management system
          using the specified credential.
        </Trans>
      </PluginHelpText>
    </>
  );
}

CredentialPluginSelected.propTypes = {
  credential: Credential.isRequired,
  onEditPlugin: func,
  onClearPlugin: func,
};

CredentialPluginSelected.defaultProps = {
  onEditPlugin: () => {},
  onClearPlugin: () => {},
};

export default withI18n()(CredentialPluginSelected);

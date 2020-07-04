import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { useField } from 'formik';
import React from 'react';

import CredentialLookup from '../../../../components/Lookup/CredentialLookup';
import { OptionsField, VerbosityField } from './SharedFields';

const VirtualizationSubForm = ({ i18n }) => {
  const [credentialField, credentialMeta, credentialHelpers] = useField(
    'credential'
  );

  return (
    <>
      <CredentialLookup
        credentialTypeNamespace="rhv"
        label={i18n._(t`Credential`)}
        helperTextInvalid={credentialMeta.error}
        isValid={!credentialMeta.touched || !credentialMeta.error}
        onBlur={() => credentialHelpers.setTouched()}
        onChange={(value) => {
          credentialHelpers.setValue(value);
        }}
        value={credentialField.value}
        required
      />
      <VerbosityField />
      <OptionsField />
    </>
  );
};

export default withI18n()(VirtualizationSubForm);

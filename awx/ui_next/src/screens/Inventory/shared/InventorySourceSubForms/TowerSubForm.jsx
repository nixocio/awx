import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { useField } from 'formik';
import React from 'react';

import CredentialLookup from '../../../../components/Lookup/CredentialLookup';
import {
  InstanceFiltersField,
  OptionsField,
  VerbosityField,
} from './SharedFields';

const TowerSubForm = ({ i18n }) => {
  const [credentialField, credentialMeta, credentialHelpers] = useField(
    'credential'
  );

  return (
    <>
      <CredentialLookup
        credentialTypeNamespace="tower"
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
      <InstanceFiltersField />
      <VerbosityField />
      <OptionsField />
    </>
  );
};

export default withI18n()(TowerSubForm);

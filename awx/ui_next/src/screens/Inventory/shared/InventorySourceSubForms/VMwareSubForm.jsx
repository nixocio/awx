import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { useField } from 'formik';
import React from 'react';

import CredentialLookup from '../../../../components/Lookup/CredentialLookup';
import {
  GroupByField,
  InstanceFiltersField,
  OptionsField,
  SourceVarsField,
  VerbosityField,
} from './SharedFields';

const VMwareSubForm = ({ i18n }) => {
  const [credentialField, credentialMeta, credentialHelpers] = useField(
    'credential'
  );

  return (
    <>
      <CredentialLookup
        credentialTypeNamespace="vmware"
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
      <GroupByField isCreatable />
      <VerbosityField />
      <OptionsField />
      <SourceVarsField />
    </>
  );
};

export default withI18n()(VMwareSubForm);

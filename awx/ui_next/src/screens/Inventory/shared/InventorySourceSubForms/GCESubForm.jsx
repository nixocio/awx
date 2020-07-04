import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { useField } from 'formik';
import React from 'react';

import CredentialLookup from '../../../../components/Lookup/CredentialLookup';
import { OptionsField, RegionsField, VerbosityField } from './SharedFields';

const GCESubForm = ({ i18n, sourceOptions }) => {
  const [credentialField, credentialMeta, credentialHelpers] = useField(
    'credential'
  );

  return (
    <>
      <CredentialLookup
        credentialTypeNamespace="gce"
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
      <RegionsField
        regionOptions={
          sourceOptions?.actions?.POST?.source_regions?.gce_region_choices
        }
      />
      <VerbosityField />
      <OptionsField />
    </>
  );
};

export default withI18n()(GCESubForm);

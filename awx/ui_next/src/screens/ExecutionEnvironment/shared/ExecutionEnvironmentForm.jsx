import React, { useCallback, useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { Formik, useField, useFormikContext } from 'formik';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';

import { Form, Radio } from '@patternfly/react-core';
import FormField, { FormSubmitError } from '../../../components/FormField';
import FormActionGroup from '../../../components/FormActionGroup';
import CredentialLookup from '../../../components/Lookup/CredentialLookup';
import { required, url } from '../../../util/validators';
import { FormColumnLayout } from '../../../components/FormLayout';
import { useConfig } from '../../../contexts/Config';
import ContentLoading from '../../../components/ContentLoading/ContentLoading';
import ExecutionEnvironmentOrganizationLookup from '../../../components/Lookup/ExecutionEnvironmentOrganizationLookup';
import { OrganizationLookup } from '../../../components/Lookup';

function ExecutionEnvironmentFormFields({ i18n, me }) {
  const [credentialField, , credentialHelpers] = useField('credential');
  const [organizationField, organizationMeta, organizationHelpers] = useField({
    name: 'organization',
    validate: !me.is_superuser
      ? required(i18n._(t`Select a value for this field`), i18n)
      : () => undefined,
  });

  const [available, SetAvailable] = useState(!organizationField.value);

  useEffect(() => {
    SetAvailable(!organizationField.value);
  }, [organizationField.value]);

  console.log(organizationField.value);

  const { setFieldValue } = useFormikContext();
  const onCredentialChange = useCallback(
    value => {
      setFieldValue('credential', value);
    },
    [setFieldValue]
  );

  return (
    <>
      <FormField
        id="execution-environment-image"
        label={i18n._(t`Image name`)}
        name="image"
        type="text"
        validate={url(i18n)}
        isRequired
        tooltip={i18n._(
          t`The registry location where the container is stored.`
        )}
      />
      <FormField
        id="execution-environment-description"
        label={i18n._(t`Description`)}
        name="description"
        type="text"
      />
      <ExecutionEnvironmentOrganizationLookup
        helperTextInvalid={organizationMeta.error}
        isValid={!organizationMeta.touched || !organizationMeta.error}
        onBlur={() => organizationHelpers.setTouched()}
        onChange={value => {
          organizationHelpers.setValue(value);
        }}
        value={organizationField.value}
        required={!me.is_superuser}
        execEnvCheckBox={
          <>
            <div>{organizationField.value}</div>
            <Radio
              name="radio"
              label="Globally available"
              isChecked={available}
              aria-label="controlled checkbox example"
              id="check-1"
            />
          </>
        }
      />
      <CredentialLookup
        label={i18n._(t`Registry credential`)}
        onChange={onCredentialChange}
        value={credentialField.value}
      />
    </>
  );
}

function ExecutionEnvironmentForm({
  executionEnvironment = {},
  onSubmit,
  onCancel,
  submitError,
  ...rest
}) {
  const { me = {} } = useConfig();
  if (Object.keys(me).length === 0) {
    return <ContentLoading />;
  }

  const initialValues = {
    image: executionEnvironment.image || '',
    description: executionEnvironment.description || '',
    credential: executionEnvironment?.summary_fields?.credential || null,
    organization: executionEnvironment?.summary_fields?.organization || null,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={values => onSubmit(values)}>
      {formik => (
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <FormColumnLayout>
            <ExecutionEnvironmentFormFields me={me} {...rest} />
            {submitError && <FormSubmitError error={submitError} />}
            <FormActionGroup
              onCancel={onCancel}
              onSubmit={formik.handleSubmit}
            />
          </FormColumnLayout>
        </Form>
      )}
    </Formik>
  );
}

ExecutionEnvironmentForm.propTypes = {
  executionEnvironment: shape({}),
  onCancel: func.isRequired,
  onSubmit: func.isRequired,
  submitError: shape({}),
};

ExecutionEnvironmentForm.defaultProps = {
  executionEnvironment: {},
  submitError: null,
};

export default withI18n()(ExecutionEnvironmentForm);

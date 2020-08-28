import React, { useState, useEffect, useCallback } from 'react';
import { func, shape } from 'prop-types';
import { Formik, useField, useFormikContext } from 'formik';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Form, FormGroup, Checkbox } from '@patternfly/react-core';
import { Card, PageSection } from '@patternfly/react-core';
import { jsonToYaml, isJsonString } from '../../../util/yaml';
import { CardBody } from '../../../components/Card';

import FormField, {
  FieldTooltip,
  FormSubmitError,
  CheckboxField,
} from '../../../components/FormField';
import FormActionGroup from '../../../components/FormActionGroup';
import { required, minMaxValue } from '../../../util/validators';
import {
  FormColumnLayout,
  FormFullWidthLayout,
  FormCheckboxLayout,
  SubFormLayout,
} from '../../../components/FormLayout';
import CredentialLookup from '../../../components/Lookup/CredentialLookup';
import { VariablesField } from '../../../components/CodeMirrorInput';
import { InstanceGroupsAPI, CredentialTypesAPI } from '../../../api';
import useRequest from '../../../util/useRequest';
import ContentError from '../../../components/ContentError';
import ContentLoading from '../../../components/ContentLoading';

function ContainerGroupFormFields({ i18n, isChecked, pod_spec_override }) {
  const [credentialField, credentialMeta, credentialHelpers] = useField(
    'credential'
  );

  const [specField, specMeta, specHelpers] = useField('pod_spec_override');

  const [allowCallbacks, setAllowCallbacks] = useState(isChecked);

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (!allowCallbacks) {
      setFieldValue('pod_spec_override', null);
    } else {
      setFieldValue('pod_spec_override', pod_spec_override);
    }
  }, [allowCallbacks]);

  console.log(allowCallbacks, 'allowCallbacks');

  console.log(specField.value, 'specField');

  return (
    <>
      <FormField
        name="name"
        id="container-group-name"
        label={i18n._(t`Name`)}
        type="text"
        validate={required(null, i18n)}
        isRequired
      />
      <CredentialLookup
        label={i18n._(t`Credential`)}
        credentialTypeKind="kubernetes"
        helperTextInvalid={credentialMeta.error}
        isValid={!credentialMeta.touched || !credentialMeta.error}
        onBlur={() => credentialHelpers.setTouched()}
        onChange={value => {
          credentialHelpers.setValue(value);
        }}
        value={credentialField.value}
        isRequired
      />

      <FormGroup
        fieldId="container-groups-option-checkbox"
        label={i18n._(t`Options`)}
      >
        <FormCheckboxLayout>
          <Checkbox
            name="override"
            aria-label={i18n._(t`Customize pod specification`)}
            label={
              <span>
                {i18n._(t`Customize pod spec`)}
                &nbsp;
                <FieldTooltip content={i18n._(t`Customize pod spec...`)} />
              </span>
            }
            id="override"
            isChecked={allowCallbacks}
            onChange={checked => {
              setAllowCallbacks(checked);
            }}
          />
        </FormCheckboxLayout>
      </FormGroup>

      {allowCallbacks && (
        <SubFormLayout>
          <FormFullWidthLayout>
            <VariablesField
              tooltip={i18n._(
                t`Field for passing a custom Kubernetes or OpenShift Pod specification.`
              )}
              id="custom-pod-spec"
              name="pod_spec_override"
              label={i18n._(t`Custom pod spec`)}
            />
          </FormFullWidthLayout>
        </SubFormLayout>
      )}
    </>
  );
}

function ContainerGroupForm({
  instanceGroup,
  onSubmit,
  onCancel,
  submitError,
  ...rest
}) {
  const {
    error: fetchError,
    isLoading,
    request: fetchInitialPodSpec,
    result: initialSpec,
  } = useRequest(
    useCallback(async () => {
      const { data } = await InstanceGroupsAPI.readOptions();
      return data.actions.POST.pod_spec_override.default;
    }, []),
    {
      initialSpec: {},
    }
  );

  useEffect(() => {
    fetchInitialPodSpec();
  }, []);

  let isChecked = Boolean(instanceGroup.pod_spec_override) || false;

  const initialValues = {
    name: instanceGroup.name || '',
    credential: instanceGroup?.summary_fields?.credential,
    pod_spec_override: isChecked
      ? jsonToYaml(JSON.stringify(instanceGroup.pod_spec_override))
      : jsonToYaml(JSON.stringify(initialSpec)),
    override: isChecked,
  };

  const pod_spec_override = initialValues['pod_spec_override'];

  if (fetchError) {
    return (
      <PageSection>
        <Card>
          <CardBody>
            <ContentError />
          </CardBody>
        </Card>
      </PageSection>
    );
  }

  if (isLoading) {
    return (
      <PageSection>
        <Card>
          <CardBody>
            <ContentLoading />
          </CardBody>
        </Card>
      </PageSection>
    );
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {formik => (
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <FormColumnLayout>
            <ContainerGroupFormFields
              pod_spec_override={pod_spec_override}
              isChecked={isChecked}
              {...rest}
            />
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

ContainerGroupForm.propTypes = {
  instanceGroup: shape({}),
  onCancel: func.isRequired,
  onSubmit: func.isRequired,
  submitError: shape({}),
};

ContainerGroupForm.defaultProps = {
  instanceGroup: {},
  submitError: null,
};

export default withI18n()(ContainerGroupForm);

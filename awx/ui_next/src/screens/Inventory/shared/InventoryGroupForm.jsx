import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { Card, Form } from '@patternfly/react-core';
import { Formik } from 'formik';
import React from 'react';

import { CardBody } from '../../../components/Card';
import { VariablesField } from '../../../components/CodeMirrorInput';
import FormActionGroup from '../../../components/FormActionGroup/FormActionGroup';
import FormField from '../../../components/FormField';
import {
  FormColumnLayout,
  FormFullWidthLayout,
} from '../../../components/FormLayout';
import { required } from '../../../util/validators';

function InventoryGroupForm({
  i18n,
  error,
  group = {},
  handleSubmit,
  handleCancel,
}) {
  const initialValues = {
    name: group.name || '',
    description: group.description || '',
    variables: group.variables || '---',
  };

  return (
    <Card>
      <CardBody>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form autoComplete="off" onSubmit={formik.handleSubmit}>
              <FormColumnLayout>
                <FormField
                  id="inventoryGroup-name"
                  name="name"
                  type="text"
                  label={i18n._(t`Name`)}
                  validate={required(null, i18n)}
                  isRequired
                />
                <FormField
                  id="inventoryGroup-description"
                  name="description"
                  type="text"
                  label={i18n._(t`Description`)}
                />
                <FormFullWidthLayout>
                  <VariablesField
                    id="host-variables"
                    name="variables"
                    label={i18n._(t`Variables`)}
                  />
                </FormFullWidthLayout>
                <FormActionGroup
                  onCancel={handleCancel}
                  onSubmit={formik.handleSubmit}
                />
                {error ? <div>error</div> : null}
              </FormColumnLayout>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}

export default withI18n()(InventoryGroupForm);

import React, { useState } from 'react';
import { Card, PageSection } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

import CredentialTypeForm from '../shared/CredentialTypeForm';
import { CardBody } from '../../../components/Card';
import { CredentialTypesAPI } from '../../../api';
import { parseVariableFields } from '../../../util/yaml';

function CredentialTypeAdd() {
  const history = useHistory();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async values => {
    try {
      const { data: response } = await CredentialTypesAPI.create({
        ...values,
        injectors: parseVariableFields(values.injectors),
        inputs: parseVariableFields(values.inputs),
        kind: 'cloud',
      });
      history.push(`/credential_types/${response.id}/details`);
    } catch (error) {
      setSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/credential_types`);
  };

  return (
    <PageSection>
      <Card>
        <CardBody>
          <CredentialTypeForm
            onSubmit={handleSubmit}
            submitError={submitError}
            onCancel={handleCancel}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default CredentialTypeAdd;

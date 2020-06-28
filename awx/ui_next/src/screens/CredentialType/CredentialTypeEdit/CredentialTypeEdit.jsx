import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, PageSection } from '@patternfly/react-core';
import { CardBody } from '../../../components/Card';

import { CredentialTypesAPI } from '../../../api';
import CredentialTypeForm from '../shared/CredentialTypeForm';

function CredentialTypeEdit(credentialType) {
  const history = useHistory();
  const { id } = useParams();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (...values) => {
    console.log({...values})
    try {
      await CredentialTypesAPI.update(id, values);
      history.push(`/credential_types/${id}/details`);  
    } catch (error) {
      setSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/credential_types/${id}/details`);
  };

  return (
    <PageSection>
      <Card>
        <CardBody>
          <CredentialTypeForm
            credentialType={credentialType}
            onSubmit={handleSubmit}
            submitError={submitError}
            onCancel={handleCancel}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default CredentialTypeEdit;

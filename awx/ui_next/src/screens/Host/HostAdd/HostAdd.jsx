import { Card, PageSection } from '@patternfly/react-core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { HostsAPI } from '../../../api';
import { CardBody } from '../../../components/Card';
import HostForm from '../../../components/HostForm';

function HostAdd() {
  const [formError, setFormError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (formData) => {
    try {
      const { data: response } = await HostsAPI.create(formData);
      history.push(`/hosts/${response.id}/details`);
    } catch (error) {
      setFormError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/hosts`);
  };

  return (
    <PageSection>
      <Card>
        <CardBody>
          <HostForm
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            submitError={formError}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default HostAdd;

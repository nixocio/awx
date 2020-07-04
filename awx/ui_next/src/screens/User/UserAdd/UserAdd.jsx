import { Card, PageSection } from '@patternfly/react-core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UsersAPI } from '../../../api';
import { CardBody } from '../../../components/Card';
import UserForm from '../shared/UserForm';

function UserAdd() {
  const [formSubmitError, setFormSubmitError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (values) => {
    setFormSubmitError(null);
    try {
      const {
        data: { id },
      } = await UsersAPI.create(values);
      history.push(`/users/${id}/details`);
    } catch (error) {
      setFormSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/users`);
  };

  return (
    <PageSection>
      <Card>
        <CardBody>
          <UserForm
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            submitError={formSubmitError}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default UserAdd;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { HostsAPI } from '../../../api';
import { CardBody } from '../../../components/Card';
import HostForm from '../../../components/HostForm';

function HostEdit({ host }) {
  const [formError, setFormError] = useState(null);
  const detailsUrl = `/hosts/${host.id}/details`;
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await HostsAPI.update(host.id, values);
      history.push(detailsUrl);
    } catch (error) {
      setFormError(error);
    }
  };

  const handleCancel = () => {
    history.push(detailsUrl);
  };

  return (
    <CardBody>
      <HostForm
        host={host}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        submitError={formError}
      />
    </CardBody>
  );
}

HostEdit.propTypes = {
  host: PropTypes.shape().isRequired,
};

export default HostEdit;

import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, PageSection } from '@patternfly/react-core';

import { CardBody } from '../../../components/Card';
import { InstanceGroupsAPI } from '../../../api';
import ContainerGroupForm from '../shared/ContainerGroupForm';
import { InstanceGroup } from '../../../types';
import { jsonToYaml, isJsonString } from '../../../util/yaml';
import useRequest from '../../../util/useRequest';
import ContentError from '../../../components/ContentError';
import ContentLoading from '../../../components/ContentLoading';

function ContainerGroupEdit({ instanceGroup }) {
  const history = useHistory();
  const [submitError, setSubmitError] = useState(null);
  const detailsIUrl = `/instance_groups/container_group/${instanceGroup.id}/details`;

  const {
    error: fetchError,
    isLoading,
    request: fetchInitialPodSpec,
    result: initialPodSpec,
  } = useRequest(
    useCallback(async () => {
      const { data } = await InstanceGroupsAPI.readOptions();
      return data.actions.POST.pod_spec_override.default;
    }, []),
    {
      initialPodSpec: {},
    }
  );

  useEffect(() => {
    fetchInitialPodSpec();
  }, []);

  const getPodSpecOverrideValue = value => {
    if (isJsonString(value)) {
      value = jsonToYaml(value);
    }
    if (value !== jsonToYaml(JSON.stringify(initialPodSpec))) {
      return JSON.stringify(value);
    }
    return null;
  };

  const handleSubmit = async values => {
    console.log(values, 'Edit');
    try {
      await InstanceGroupsAPI.update(instanceGroup.id, {
        name: values.name,
        credential: values.credential.id,
        pod_spec_override: values.pod_spec_override
          ? getPodSpecOverrideValue(values.pod_spec_override)
          : null,
      });
      history.push(detailsIUrl);
    } catch (error) {
      setSubmitError(error);
    }
  };
  const handleCancel = () => {
    history.push(detailsIUrl);
  };

  if (fetchError) {
    return (
      <PageSection>
        <Card>
          <CardBody>
            <ContentError error={fetchError} />
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
    <CardBody>
      <ContainerGroupForm
        instanceGroup={instanceGroup}
        initialPodSpec={
          instanceGroup.pod_spec_override
            ? JSON.stringify(instanceGroup.pod_spec_override)
            : initialPodSpec
        }
        onSubmit={handleSubmit}
        submitError={submitError}
        onCancel={handleCancel}
      />
    </CardBody>
  );
}

export default ContainerGroupEdit;

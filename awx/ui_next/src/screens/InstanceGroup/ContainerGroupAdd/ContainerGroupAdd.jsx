import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Card, PageSection } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

import ContainerGroupForm from '../shared/ContainerGroupForm';
import { CardBody } from '../../../components/Card';
import { InstanceGroupsAPI, CredentialTypesAPI } from '../../../api';
import useRequest from '../../../util/useRequest';
import ContentError from '../../../components/ContentError';
import ContentLoading from '../../../components/ContentLoading';

import { jsonToYaml, isJsonString } from '../../../util/yaml';

function ContainerGroupAdd() {
  const history = useHistory();
  const [submitError, setSubmitError] = useState(null);

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
    console.log(values);
    try {
      const { data: response } = await InstanceGroupsAPI.create({
        name: values.name,
        credential: values.credential.id,
        pod_spec_override: getPodSpecOverrideValue(values.pod_spec_override),
      });
      history.push(`/instance_groups/container_group/${response.id}/details`);
    } catch (error) {
      setSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/instance_groups`);
  };

  const consoleValues = values => {
    console.log(values, 'valuesSubmit');
  };
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
    <PageSection>
      <Card>
        <CardBody>
          <ContainerGroupForm
            onSubmit={handleSubmit}
            submitError={submitError}
            onCancel={handleCancel}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default ContainerGroupAdd;

import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React, { useCallback, useEffect } from 'react';

import { HostsAPI } from '../../../api';
import { CardBody } from '../../../components/Card';
import { VariablesDetail } from '../../../components/CodeMirrorInput';
import ContentError from '../../../components/ContentError';
import ContentLoading from '../../../components/ContentLoading';
import { DetailList } from '../../../components/DetailList';
import { Host } from '../../../types';
import useRequest from '../../../util/useRequest';

function HostFacts({ i18n, host }) {
  const { result: facts, isLoading, error, request: fetchFacts } = useRequest(
    useCallback(async () => {
      const [{ data: factsObj }] = await Promise.all([
        HostsAPI.readFacts(host.id),
      ]);
      return JSON.stringify(factsObj, null, 4);
    }, [host]),
    '{}'
  );

  useEffect(() => {
    fetchFacts();
  }, [fetchFacts]);

  if (isLoading) {
    return <ContentLoading />;
  }

  if (error) {
    return <ContentError error={error} />;
  }

  return (
    <CardBody>
      <DetailList gutter="sm">
        <VariablesDetail label={i18n._(t`Facts`)} fullHeight value={facts} />
      </DetailList>
    </CardBody>
  );
}

HostFacts.propTypes = {
  host: Host.isRequired,
};

export default withI18n()(HostFacts);

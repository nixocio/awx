import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { WorkflowJobTemplatesAPI } from '../../../../../../api';
import CheckboxListItem from '../../../../../../components/CheckboxListItem';
import DataListToolbar from '../../../../../../components/DataListToolbar';
import PaginatedDataList from '../../../../../../components/PaginatedDataList';
import { getQSConfig, parseQueryString } from '../../../../../../util/qs';

const QS_CONFIG = getQSConfig('workflow_job_templates', {
  page: 1,
  page_size: 5,
  order_by: 'name',
});

function WorkflowJobTemplatesList({
  i18n,
  nodeResource,
  onUpdateNodeResource,
}) {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workflowJobTemplates, setWorkflowJobTemplates] = useState([]);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setWorkflowJobTemplates([]);
      setCount(0);
      const params = parseQueryString(QS_CONFIG, location.search);
      try {
        const { data } = await WorkflowJobTemplatesAPI.read(params, {
          role_level: 'execute_role',
        });
        setWorkflowJobTemplates(data.results);
        setCount(data.count);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location]);

  return (
    <PaginatedDataList
      contentError={error}
      hasContentLoading={isLoading}
      itemCount={count}
      items={workflowJobTemplates}
      onRowClick={(row) => onUpdateNodeResource(row)}
      qsConfig={QS_CONFIG}
      renderItem={(item) => (
        <CheckboxListItem
          isSelected={!!(nodeResource && nodeResource.id === item.id)}
          itemId={item.id}
          key={item.id}
          name={item.name}
          label={item.name}
          onSelect={() => onUpdateNodeResource(item)}
          onDeselect={() => onUpdateNodeResource(null)}
          isRadio
        />
      )}
      renderToolbar={(props) => <DataListToolbar {...props} fillWidth />}
      showPageSizeOptions={false}
      toolbarSearchColumns={[
        {
          name: i18n._(t`Name`),
          key: 'name',
          isDefault: true,
        },
        {
          name: i18n._(t`Organization (Name)`),
          key: 'organization__name',
        },
        {
          name: i18n._(t`Inventory (Name)`),
          key: 'inventory__name',
        },
        {
          name: i18n._(t`Created By (Username)`),
          key: 'created_by__username',
        },
        {
          name: i18n._(t`Modified By (Username)`),
          key: 'modified_by__username',
        },
      ]}
      toolbarSortColumns={[
        {
          name: i18n._(t`Name`),
          key: 'name',
        },
      ]}
    />
  );
}

WorkflowJobTemplatesList.propTypes = {
  nodeResource: shape(),
  onUpdateNodeResource: func.isRequired,
};

WorkflowJobTemplatesList.defaultProps = {
  nodeResource: null,
};

export default withI18n()(WorkflowJobTemplatesList);

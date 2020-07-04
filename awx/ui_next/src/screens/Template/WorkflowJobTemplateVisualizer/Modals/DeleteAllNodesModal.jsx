import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { Button } from '@patternfly/react-core';
import React, { useContext } from 'react';

import AlertModal from '../../../../components/AlertModal';
import { WorkflowDispatchContext } from '../../../../contexts/Workflow';

function DeleteAllNodesModal({ i18n }) {
  const dispatch = useContext(WorkflowDispatchContext);
  return (
    <AlertModal
      actions={[
        <Button
          id="confirm-delete-all-nodes"
          key="remove"
          variant="danger"
          aria-label={i18n._(t`Confirm removal of all nodes`)}
          onClick={() => dispatch({ type: 'DELETE_ALL_NODES' })}
        >
          {i18n._(t`Remove`)}
        </Button>,
        <Button
          id="cancel-delete-all-nodes"
          key="cancel"
          variant="secondary"
          aria-label={i18n._(t`Cancel node removal`)}
          onClick={() => dispatch({ type: 'TOGGLE_DELETE_ALL_NODES_MODAL' })}
        >
          {i18n._(t`Cancel`)}
        </Button>,
      ]}
      isOpen
      onClose={() => dispatch({ type: 'TOGGLE_DELETE_ALL_NODES_MODAL' })}
      title={i18n._(t`Remove All Nodes`)}
      variant="danger"
    >
      <p>
        {i18n._(
          t`Are you sure you want to remove all the nodes in this workflow?`
        )}
      </p>
    </AlertModal>
  );
}

export default withI18n()(DeleteAllNodesModal);

import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { Button, Tooltip } from '@patternfly/react-core';
import { func, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function ToolbarAddButton({ linkTo, onClick, i18n, isDisabled }) {
  if (!linkTo && !onClick) {
    throw new Error(
      'ToolbarAddButton requires either `linkTo` or `onClick` prop'
    );
  }
  if (linkTo) {
    return (
      <Tooltip content={i18n._(t`Add`)} position="top">
        <Button
          isDisabled={isDisabled}
          component={Link}
          to={linkTo}
          variant="primary"
          aria-label={i18n._(t`Add`)}
        >
          {i18n._(t`Add`)}
        </Button>
      </Tooltip>
    );
  }
  return (
    <Button variant="primary" aria-label={i18n._(t`Add`)} onClick={onClick}>
      {i18n._(t`Add`)}
    </Button>
  );
}
ToolbarAddButton.propTypes = {
  linkTo: string,
  onClick: func,
};
ToolbarAddButton.defaultProps = {
  linkTo: null,
  onClick: null,
};

export default withI18n()(ToolbarAddButton);

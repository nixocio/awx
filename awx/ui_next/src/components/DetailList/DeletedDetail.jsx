import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import _Detail from './Detail';

const Detail = styled(_Detail)`
  dd& {
    color: red;
  }
`;

function DeletedDetail({ i18n, label }) {
  return <Detail label={label} value={i18n._(t`Deleted`)} />;
}

DeletedDetail.propTypes = {
  label: node.isRequired,
};

export default withI18n()(DeletedDetail);

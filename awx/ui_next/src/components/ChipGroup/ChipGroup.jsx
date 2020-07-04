import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import { ChipGroup as PFChipGroup } from '@patternfly/react-core';
import { number, shape } from 'prop-types';
import React from 'react';

function ChipGroup({ i18n, numChips, totalChips, i18nHash, ...props }) {
  return (
    <PFChipGroup
      {...props}
      numChips={numChips}
      expandedText={i18n._(t`Show less`)}
      collapsedText={i18n._(t`${totalChips - numChips} more`)}
    />
  );
}

ChipGroup.propTypes = {
  numChips: number.isRequired,
  totalChips: number.isRequired,
  i18n: shape({}).isRequired,
};

export default withI18n()(ChipGroup);

import React from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { ChipGroup } from '@patternfly/react-core';

function CustomChipGroup({ i18n, numChips, totalChips, ...props }) {
  let remaining;
  remaining = totalChips - numChips;
  return (
    <ChipGroup
      {...props}
      numChips={numChips}
      expandedText={i18n._(t`Show Less`)}
      collapsedText={i18n._(t`${remaining} more`)}
    ></ChipGroup>
  );
}
// CustomChipGroup.propTypes = {
//   numChips: numChips.isRequired,
//   i18n: shape({}).isRequired,
// };

export default withI18n()(CustomChipGroup);

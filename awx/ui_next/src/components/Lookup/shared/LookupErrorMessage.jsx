import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import React from 'react';

function LookupErrorMessage({ error, i18n }) {
  if (!error) {
    return null;
  }

  return (
    <div className="pf-c-form__helper-text pf-m-error" aria-live="polite">
      {error.message || i18n._(t`An error occured`)}
    </div>
  );
}

export default withI18n()(LookupErrorMessage);

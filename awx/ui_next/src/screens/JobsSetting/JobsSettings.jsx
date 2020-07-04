import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import {
  PageSection,
  PageSectionVariants,
  Title,
} from '@patternfly/react-core';
import React, { Component, Fragment } from 'react';

class JobsSettings extends Component {
  render() {
    const { i18n } = this.props;
    const { light } = PageSectionVariants;

    return (
      <Fragment>
        <PageSection variant={light} className="pf-m-condensed">
          <Title size="2xl" headingLevel="h2">
            {i18n._(t`Jobs Settings`)}
          </Title>
        </PageSection>
        <PageSection />
      </Fragment>
    );
  }
}

export default withI18n()(JobsSettings);

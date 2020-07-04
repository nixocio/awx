import { Card, PageSection } from '@patternfly/react-core';
import React from 'react';

import ContentError from '../components/ContentError';

function NotFound() {
  return (
    <PageSection>
      <Card>
        <ContentError isNotFound />
      </Card>
    </PageSection>
  );
}

export default NotFound;

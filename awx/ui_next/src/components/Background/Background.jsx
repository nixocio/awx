import { BackgroundImage } from '@patternfly/react-core';
import React, { Fragment } from 'react';

export default ({ children }) => (
  <Fragment>
    <BackgroundImage />
    {children}
  </Fragment>
);

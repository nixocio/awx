import { CardBody } from '@patternfly/react-core';
import styled from 'styled-components';

const TabbedCardBody = styled(CardBody)`
  padding-top: var(--pf-c-card--first-child--PaddingTop);
`;
CardBody.displayName = 'PFCardBody';

export default TabbedCardBody;

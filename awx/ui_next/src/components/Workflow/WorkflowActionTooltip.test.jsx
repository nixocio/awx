import { mount } from 'enzyme';
import React from 'react';

import WorkflowActionTooltip from './WorkflowActionTooltip';

describe('WorkflowActionTooltip', () => {
  test('successfully mounts', () => {
    const wrapper = mount(
      <svg>
        <WorkflowActionTooltip actions={[]} pointX={0} pointY={0} />
      </svg>
    );
    expect(wrapper).toHaveLength(1);
  });
});

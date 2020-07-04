import { mount } from 'enzyme';
import React from 'react';

import WorkflowHelp from './WorkflowHelp';

describe('WorkflowHelp', () => {
  test('successfully mounts', () => {
    const wrapper = mount(<WorkflowHelp />);
    expect(wrapper).toHaveLength(1);
  });
});

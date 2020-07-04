import { mount } from 'enzyme';
import React from 'react';

import Detail from './Detail';

describe('Detail', () => {
  test('renders the expected content', () => {
    const wrapper = mount(<Detail label="foo" />);
    expect(wrapper).toHaveLength(1);
  });
});

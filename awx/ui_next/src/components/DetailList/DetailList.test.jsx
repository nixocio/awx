import { mount } from 'enzyme';
import React from 'react';

import DetailList from './DetailList';

describe('DetailList', () => {
  test('renders the expected content', () => {
    const wrapper = mount(<DetailList />);
    expect(wrapper).toHaveLength(1);
  });
});

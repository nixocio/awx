import { shallow } from 'enzyme';
import React from 'react';

import InventorySources from './InventorySources';

describe('<InventorySources />', () => {
  test('initially renders without crashing', () => {
    const wrapper = shallow(<InventorySources />);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});

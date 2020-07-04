import { shallow } from 'enzyme';
import React from 'react';

import CheckboxCard from './CheckboxCard';

describe('<CheckboxCard />', () => {
  let wrapper;
  test('initially renders without crashing', () => {
    wrapper = shallow(<CheckboxCard name="Foobar" itemId={5} />);
    expect(wrapper.length).toBe(1);
  });
});

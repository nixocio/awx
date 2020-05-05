import React from 'react';
import { mountWithContexts } from '@testUtils/enzymeHelpers';
import CustomChipGroup from './CustomChipGroup';

describe('CustomChipGroup', () => {
  test('should mount properly kind', () => {

    const wrapper = mountWithContexts(
      <CustomChipGroup numChips={5} totalChips={10} />
    );
    expect(wrapper.find('ChipGroup').props().collapsedText).toEqual('5 more');
  });
});

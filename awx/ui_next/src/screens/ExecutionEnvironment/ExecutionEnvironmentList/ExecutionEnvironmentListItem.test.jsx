import React from 'react';
import { act } from 'react-dom/test-utils';

import { mountWithContexts } from '../../../../testUtils/enzymeHelpers';

import ExecutionEnvironmentListItem from './ExecutionEnvironmentListItem';

describe('<ExecutionEnvironmentListItem/>', () => {
  let wrapper;
  const executionEnvironment = {
    name: 'Foo',
    id: 1,
    image: 'https://registry.com/r/image/manifest',
    organization: null,
    credential: null,
    summary_fields: { user_capabilities: { edit: true } },
    managed_by_tower: false,
  };

  test('should mount successfully', async () => {
    await act(async () => {
      wrapper = mountWithContexts(
        <table>
          <tbody>
            <ExecutionEnvironmentListItem
              executionEnvironment={executionEnvironment}
              detailUrl="execution_environments/1/details"
              isSelected={false}
              onSelect={() => {}}
            />
          </tbody>
        </table>
      );
    });
    expect(wrapper.find('ExecutionEnvironmentListItem').length).toBe(1);
  });

  test('should render the proper data', async () => {
    await act(async () => {
      wrapper = mountWithContexts(
        <table>
          <tbody>
            <ExecutionEnvironmentListItem
              executionEnvironment={executionEnvironment}
              detailUrl="execution_environments/1/details"
              isSelected={false}
              onSelect={() => {}}
            />
          </tbody>
        </table>
      );
    });
    expect(
      wrapper
        .find('Td')
        .at(1)
        .text()
    ).toBe(executionEnvironment.name);
    expect(
      wrapper
        .find('Td')
        .at(2)
        .text()
    ).toBe(executionEnvironment.image);

    expect(
      wrapper
        .find('Td')
        .at(3)
        .text()
    ).toBe('Globally Available');

    expect(wrapper.find('PencilAltIcon').exists()).toBeTruthy();
  });

  test('should not render the pencil action for ee managed by tower', async () => {
    await act(async () => {
      wrapper = mountWithContexts(
        <table>
          <tbody>
            <ExecutionEnvironmentListItem
              executionEnvironment={{
                ...executionEnvironment,
                summary_fields: { user_capabilities: { edit: false } },
                managed_by_tower: true,
              }}
              detailUrl="execution_environments/1/details"
              isSelected={false}
              onSelect={() => {}}
            />
          </tbody>
        </table>
      );
    });
    expect(
      wrapper
        .find('Td')
        .at(1)
        .text()
    ).toBe(executionEnvironment.name);
    expect(
      wrapper
        .find('Td')
        .at(2)
        .text()
    ).toBe(executionEnvironment.image);

    expect(
      wrapper
        .find('Td')
        .at(3)
        .text()
    ).toBe('Globally Available');

    expect(wrapper.find('PencilAltIcon').exists()).toBeFalsy();
  });
});

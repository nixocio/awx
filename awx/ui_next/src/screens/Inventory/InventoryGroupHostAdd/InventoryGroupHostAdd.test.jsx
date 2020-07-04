import { createMemoryHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { mountWithContexts } from '../../../../testUtils/enzymeHelpers';
import { GroupsAPI } from '../../../api';
import mockHost from '../shared/data.host.json';
import InventoryGroupHostAdd from './InventoryGroupHostAdd';

jest.mock('../../../api');

GroupsAPI.createHost.mockResolvedValue({
  data: {
    ...mockHost,
  },
});

describe('<InventoryGroupHostAdd />', () => {
  let wrapper;
  let history;

  beforeAll(async () => {
    history = createMemoryHistory();
    await act(async () => {
      wrapper = mountWithContexts(
        <InventoryGroupHostAdd inventoryGroup={{ id: 123, inventory: 3 }} />,
        {
          context: { router: { history } },
        }
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  test('handleSubmit should post to api', async () => {
    await act(async () => {
      wrapper.find('HostForm').prop('handleSubmit')(mockHost);
    });
    expect(GroupsAPI.createHost).toHaveBeenCalledWith(123, mockHost);
  });

  test('should navigate to inventory group host list when cancel is clicked', () => {
    wrapper.find('button[aria-label="Cancel"]').invoke('onClick')();
    expect(history.location.pathname).toEqual(
      '/inventories/inventory/3/groups/123/nested_hosts'
    );
  });

  test('successful form submission should trigger redirect', async () => {
    await act(async () => {
      wrapper.find('HostForm').invoke('handleSubmit')(mockHost);
    });
    expect(wrapper.find('FormSubmitError').length).toBe(0);
    expect(history.location.pathname).toEqual(
      '/inventories/inventory/3/hosts/2/details'
    );
  });

  test('failed form submission should show an error message', async () => {
    const error = {
      response: {
        data: { detail: 'An error occurred' },
      },
    };
    GroupsAPI.createHost.mockImplementationOnce(() => Promise.reject(error));
    await act(async () => {
      wrapper.find('HostForm').invoke('handleSubmit')(mockHost);
    });
    wrapper.update();
    expect(wrapper.find('FormSubmitError').length).toBe(1);
  });
});

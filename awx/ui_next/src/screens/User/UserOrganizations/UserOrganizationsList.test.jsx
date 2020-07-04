import { createMemoryHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Route } from 'react-router-dom';

import {
  mountWithContexts,
  waitForElement,
} from '../../../../testUtils/enzymeHelpers';
import { UsersAPI } from '../../../api';
import UserOrganizationsList from './UserOrganizationsList';

jest.mock('../../../api/models/Users');

describe('<UserOrganizationlist />', () => {
  let history;
  let wrapper;
  beforeEach(async () => {
    history = createMemoryHistory({
      initialEntries: ['/users/1/organizations'],
    });
    UsersAPI.readOrganizations.mockResolvedValue({
      data: {
        results: [
          {
            name: 'Foo',
            id: 1,
            description: 'Bar',
            url: '/api/v2/organizations/1/',
          },
        ],
        count: 1,
      },
    });
    await act(async () => {
      wrapper = mountWithContexts(
        <Route
          path="/users/:id/organizations"
          component={() => <UserOrganizationsList />}
        />,
        {
          context: {
            router: {
              history,
              route: {
                location: history.location,
                match: { params: { id: 1 } },
              },
            },
          },
        }
      );
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('successfully mounts', async () => {
    await waitForElement(wrapper, 'UserOrganizationListItem');
  });
  test('calls api to get organizations', () => {
    expect(UsersAPI.readOrganizations).toBeCalledWith('1', {
      order_by: 'name',
      page: 1,
      page_size: 20,
      type: 'organization',
    });
  });
});

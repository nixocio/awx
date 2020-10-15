import React from 'react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

import { UsersAPI, TeamsAPI } from '../../../api';
import {
  mountWithContexts,
  waitForElement,
} from '../../../../testUtils/enzymeHelpers';

import UserTeamList from './UserTeamList';

jest.mock('../../../api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 1,
    userId: 2,
  }),
}));

const mockAPIUserTeamList = [
  {
    name: 'Team 0',
    id: 1,
    url: '/teams/1',
    summary_fields: {
      user_capabilities: {
        delete: true,
        edit: true,
      },
      object_roles: {
        member_role: {
          id: 42,
        },
      },
    },
  },
  {
    name: 'Team 1',
    id: 2,
    url: '/teams/2',
    summary_fields: {
      user_capabilities: {
        delete: true,
        edit: true,
      },
      object_roles: {
        member_role: {
          id: 43,
        },
      },
    },
  },
  {
    name: 'Team 2',
    id: 3,
    url: '/teams/3',
    summary_fields: {
      user_capabilities: {
        delete: true,
        edit: true,
      },
      object_roles: {
        member_role: {
          id: 44,
        },
      },
    },
  },
];

const options = { data: { actions: { POST: true } } };

describe('<UserTeamList />', () => {
  let wrapper;

  beforeEach(async () => {
    UsersAPI.readTeams.mockResolvedValue({
      data: {
        count: mockAPIUserTeamList.length,
        results: mockAPIUserTeamList,
      },
    });

    UsersAPI.readTeamsOptions.mockResolvedValue(options);
    UsersAPI.readOptions.mockResolvedValue(options);
    const history = createMemoryHistory({
      initialEntries: ['/users/1/teams'],
    });
    await act(async () => {
      wrapper = mountWithContexts(<UserTeamList />, {
        context: {
          router: { history, route: { location: history.location } },
        },
      });
    });
    await waitForElement(wrapper, 'ContentLoading', el => el.length === 0);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  test('should load and render teams', async () => {
    expect(wrapper.find('UserTeamListItem')).toHaveLength(3);
  });

  test('should fetch teams from the api and render them in the list', () => {
    expect(UsersAPI.readTeams).toHaveBeenCalled();
    expect(UsersAPI.readTeamsOptions).toHaveBeenCalled();
    expect(wrapper.find('UserTeamListItem').length).toBe(3);
  });

  test('should show associate group modal when adding an existing group', () => {
    wrapper.find('ToolbarAddButton').simulate('click');
    expect(wrapper.find('AssociateModal').length).toBe(1);
    wrapper.find('ModalBoxCloseButton').simulate('click');
    expect(wrapper.find('AssociateModal').length).toBe(0);
  });

  test('should show error modal for failed disassociation', async () => {
    UsersAPI.disassociateRole.mockRejectedValue(new Error());
    await act(async () => {
      wrapper.find('Checkbox#select-all').invoke('onChange')(true);
    });
    wrapper.update();
    wrapper.find('button[aria-label="Disassociate"]').simulate('click');
    expect(wrapper.find('AlertModal Title').text()).toEqual(
      'Disassociate related team(s)?'
    );
    await act(async () => {
      wrapper
        .find('button[aria-label="confirm disassociate"]')
        .simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('AlertModal ErrorDetail').length).toBe(1);
    expect(wrapper.find('AlertModal ModalBoxBody').text()).toEqual(
      expect.stringContaining('Failed to disassociate one or more teams.')
    );
  });

  test('expected api calls are made for multi-delete', async () => {
    expect(UsersAPI.disassociateRole).toHaveBeenCalledTimes(0);
    expect(UsersAPI.readTeams).toHaveBeenCalledTimes(1);
    await act(async () => {
      wrapper.find('Checkbox#select-all').invoke('onChange')(true);
    });
    wrapper.update();
    wrapper.find('button[aria-label="Disassociate"]').simulate('click');
    expect(wrapper.find('AlertModal Title').text()).toEqual(
      'Disassociate related team(s)?'
    );
    await act(async () => {
      wrapper
        .find('button[aria-label="confirm disassociate"]')
        .simulate('click');
    });
    expect(UsersAPI.disassociateRole).toHaveBeenCalledTimes(3);
    expect(UsersAPI.readTeams).toHaveBeenCalledTimes(2);
  });

  test('should make expected api request when associating teams', async () => {
    UsersAPI.associateRole.mockResolvedValue();
    TeamsAPI.read.mockResolvedValue({
      data: {
        count: 1,
        results: [
          {
            name: 'Foo',
            id: 42,
            url: '/teams/42',
            summary_fields: {
              user_capabilities: {
                delete: true,
                edit: true,
              },
              object_roles: {
                member_role: {
                  id: 78,
                },
              },
            },
          },
        ],
      },
    });
    await act(async () => {
      wrapper
        .find('ToolbarAddButton button[aria-label="Associate"]')
        .simulate('click');
    });
    await waitForElement(wrapper, 'ContentLoading', el => el.length === 0);
    wrapper.update();
    await act(async () => {
      wrapper
        .find('CheckboxListItem')
        .first()
        .invoke('onSelect')();
    });
    await act(async () => {
      wrapper.find('button[aria-label="Save"]').simulate('click');
    });
    await waitForElement(wrapper, 'AssociateModal', el => el.length === 0);
    expect(UsersAPI.associateRole).toHaveBeenCalledTimes(1);
    expect(TeamsAPI.read).toHaveBeenCalledTimes(1);
  });
});

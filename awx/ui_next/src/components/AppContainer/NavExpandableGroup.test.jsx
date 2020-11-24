import React from 'react';
import { createMemoryHistory } from 'history';

import { mountWithContexts } from '../../../testUtils/enzymeHelpers';
import NavExpandableGroup from './NavExpandableGroup';

describe('NavExpandableGroup', () => {
  test('initialization and render', () => {
    const history = createMemoryHistory({ initialEntries: ['/foo'] });
    const component = mountWithContexts(
      <NavExpandableGroup
        groupId="test"
        groupTitle="Test"
        routes={[
          { path: '/foo', title: 'Foo' },
          { path: '/bar', title: 'Bar' },
          { path: '/fiz', title: 'Fiz' },
        ]}
      />,
      { context: { router: { history } } }
    );
    expect(component.find('NavExpandableGroup').length).toBe(1);
    expect(component.find('NavItem').length).toBe(3);

    expect(
      component
        .find('NavItem')
        .at(0)
        .prop('isActive')
    ).toBe(true);
    expect(
      component
        .find('NavItem')
        .at(0)
        .find('Link')
        .prop('to')
    ).toBe('/foo');

    expect(
      component
        .find('NavItem')
        .at(1)
        .prop('isActive')
    ).toBe(false);
    expect(
      component
        .find('NavItem')
        .at(1)
        .find('Link')
        .prop('to')
    ).toBe('/bar');

    expect(
      component
        .find('NavItem')
        .at(2)
        .prop('isActive')
    ).toBe(false);
    expect(
      component
        .find('NavItem')
        .at(2)
        .find('Link')
        .prop('to')
    ).toBe('/fiz');
  });

  describe('isActivePath', () => {
    const params = [
      ['/fo', '/foo', false],
      ['/foo', '/foo', true],
      ['/foo/1/bar/fiz', '/foo', true],
      ['/foo/1/bar/fiz', 'foo', false],
      ['/foo/1/bar/fiz', 'foo/', false],
      ['/foo/1/bar/fiz', '/bar', false],
      ['/foo/1/bar/fiz', '/fiz', false],
    ];

    params.forEach(([location, path, expected]) => {
      test(`when location is ${location}, isActivePath('${path}') returns ${expected} `, () => {
        const history = createMemoryHistory({
          initialEntries: [`${location}`],
        });
        console.log(history, 'history');
        const component = mountWithContexts(
          <NavExpandableGroup
            groupId="test"
            groupTitle="Test"
            routes={[
              { path: '/foo', title: 'Foo' },
              { path: '/bar', title: 'Bar' },
              { path: '/fiz', title: 'Fiz' },
            ]}
          />,
          { context: { router: { history } } }
        );

        expect(
          component
            .find('NavItem')
            .at(0)
            .prop('isActive')
        ).toBe(expected);
        expect(
          component
            .find('NavItem')
            .at(0)
            .find('Link')
            .prop('to')
        ).toBe(`${path}`);
      });
    });
  });
});

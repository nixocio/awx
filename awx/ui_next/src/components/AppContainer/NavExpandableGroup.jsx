import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, Link, withRouter, useHistory } from 'react-router-dom';
import { NavExpandable, NavItem } from '@patternfly/react-core';

import {useConfig} from '../../contexts/Config'

function NavExpandableGroup({ groupId, groupTitle, routes, isNormalUser }) {

  const {me = {}} = useConfig();
  console.log(me, 'me')
  const history = useHistory();

  // Extract a list of paths from the route params and store them for later. This creates
  // an array of url paths associated with any NavItem component rendered by this component.

  const filteredRoutes = routes.filter(
    item => item.isVisibleNormalUser !== isNormalUser
  );
  const navItemPaths = filteredRoutes.map(({ path }) => path);

  const isActiveGroup = () => {
    return navItemPaths.some(isActivePath);
  };

  const isActivePath = path => {
    return Boolean(matchPath(history.location.pathname, { path }));
  };

  // Settings is the only one with length 1

    if (filteredRoutes.length === 1) {
      const [{ path }] = filteredRoutes;
      return (
        <NavItem itemId={groupId} isActive={isActivePath(path)} key={path}>
          <Link to={path}>{groupTitle}</Link>
        </NavItem>
      );
    }



  return (

    <NavExpandable
      isActive={isActiveGroup()}
      isExpanded
      groupId={groupId}
      title={groupTitle}
    >
      {filteredRoutes.map(({ path, title }) => (
        <NavItem groupId={groupId} isActive={isActivePath(path)} key={path}>
          <Link to={path}>{title}</Link>
        </NavItem>
      ))}
    </NavExpandable>
  );
}

NavExpandableGroup.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(NavExpandableGroup);

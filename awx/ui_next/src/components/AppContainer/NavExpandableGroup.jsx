import React, {useState } from 'react';
import PropTypes from 'prop-types';
import { matchPath, Link, withRouter } from 'react-router-dom';
import { NavExpandable, NavItem } from '@patternfly/react-core';

class NavExpandableGroup extends Component {
  constructor(props) {
    super(props);
    const { routes } = this.props;
    this.state = { isExpanded: true };

    // Extract a list of paths from the route params and store them for later. This creates
    // an array of url paths associated with any NavItem component rendered by this component.
    const navItemPaths = routes.map(({ path }) => path);
  }

  isActiveGroup() {
    return this.navItemPaths.some(this.isActivePath);
  }

  isActivePath(path) {
    const { history } = this.props;
    return Boolean(matchPath(history.location.pathname, { path }));
  }

  handleExpand(e, isExpanded) {
    this.setState({ isExpanded });
  }

  render() {
    const { groupId, groupTitle, routes, isNormalUser } = this.props;
    const { isExpanded } = this.state;

    if (routes.length === 1) {
      const [{ path, isVisibleNormalUser }] = routes;
      if (isVisibleNormalUser && isNormalUser) {
        return (
          <NavItem
            itemId={groupId}
            isActive={this.isActivePath(path)}
            key={path}
          >
            <Link to={path}>{groupTitle}</Link>
          </NavItem>
        );
      } else return null;
    }
 

  const verifyUser = (path, title, isNormalUser, isVisibleNormalUser)  => {
     if(isNormalUser && isNormalUser) {
       return (
        <NavItem
        groupId={groupId}
        isActive={this.isActivePath(path)}
        key={path}
      >
        <Link to={path}>{title}</Link>
      </NavItem>
       )
     }

  }

    return (
      <NavExpandable
        isActive={this.isActiveGroup()}
        isExpanded={isExpanded}
        groupId={groupId}
        title={groupTitle}
        onExpand={this.handleExpand}
      >
        {routes.map(({ path, title, isVisibleNormalUser }) => (
  
        ))}
      </NavExpandable>
    );
  }
}

NavExpandableGroup.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(NavExpandableGroup);

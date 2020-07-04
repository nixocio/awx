import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import {
  Checkbox,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { QSConfig, SearchColumns, SortColumns } from '../../types';
import ExpandCollapse from '../ExpandCollapse';
import Search from '../Search';
import Sort from '../Sort';

class DataListToolbar extends React.Component {
  render() {
    const {
      clearAllFilters,
      searchColumns,
      sortColumns,
      showSelectAll,
      isAllSelected,
      isCompact,
      onSort,
      onSearch,
      onReplaceSearch,
      onRemove,
      onCompact,
      onExpand,
      onSelectAll,
      additionalControls,
      i18n,
      qsConfig,
    } = this.props;

    const showExpandCollapse = onCompact && onExpand;
    return (
      <Toolbar
        id={`${qsConfig.namespace}-list-toolbar`}
        clearAllFilters={clearAllFilters}
        collapseListedFiltersBreakpoint="lg"
      >
        <ToolbarContent>
          {showSelectAll && (
            <ToolbarGroup>
              <ToolbarItem>
                <Checkbox
                  isChecked={isAllSelected}
                  onChange={onSelectAll}
                  aria-label={i18n._(t`Select all`)}
                  id="select-all"
                />
              </ToolbarItem>
            </ToolbarGroup>
          )}
          <ToolbarToggleGroup toggleIcon={<SearchIcon />} breakpoint="lg">
            <ToolbarItem>
              <Search
                qsConfig={qsConfig}
                columns={searchColumns}
                onSearch={onSearch}
                onReplaceSearch={onReplaceSearch}
                onRemove={onRemove}
              />
            </ToolbarItem>
            <ToolbarItem>
              <Sort qsConfig={qsConfig} columns={sortColumns} onSort={onSort} />
            </ToolbarItem>
          </ToolbarToggleGroup>
          {showExpandCollapse && (
            <ToolbarGroup>
              <Fragment>
                <ToolbarItem>
                  <ExpandCollapse
                    isCompact={isCompact}
                    onCompact={onCompact}
                    onExpand={onExpand}
                  />
                </ToolbarItem>
              </Fragment>
            </ToolbarGroup>
          )}
          <ToolbarGroup>
            {additionalControls.map((control) => (
              <ToolbarItem key={control.key}>{control}</ToolbarItem>
            ))}
          </ToolbarGroup>
        </ToolbarContent>
      </Toolbar>
    );
  }
}

DataListToolbar.propTypes = {
  clearAllFilters: PropTypes.func,
  qsConfig: QSConfig.isRequired,
  searchColumns: SearchColumns.isRequired,
  sortColumns: SortColumns.isRequired,
  showSelectAll: PropTypes.bool,
  isAllSelected: PropTypes.bool,
  isCompact: PropTypes.bool,
  onCompact: PropTypes.func,
  onExpand: PropTypes.func,
  onSearch: PropTypes.func,
  onReplaceSearch: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSort: PropTypes.func,
  additionalControls: PropTypes.arrayOf(PropTypes.node),
};

DataListToolbar.defaultProps = {
  clearAllFilters: null,
  showSelectAll: false,
  isAllSelected: false,
  isCompact: false,
  onCompact: null,
  onExpand: null,
  onSearch: null,
  onReplaceSearch: null,
  onSelectAll: null,
  onSort: null,
  additionalControls: [],
};

export default withI18n()(DataListToolbar);

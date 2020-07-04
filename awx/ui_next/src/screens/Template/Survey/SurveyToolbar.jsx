import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import {
  Button,
  Checkbox,
  Switch,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Toolbar as _Toolbar,
} from '@patternfly/react-core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { ToolbarAddButton } from '../../../components/PaginatedDataList';

const Toolbar = styled(_Toolbar)`
  margin-left: 52px;
`;

function SurveyToolbar({
  canEdit,
  isAllSelected,
  onSelectAll,
  i18n,
  surveyEnabled,
  onToggleSurvey,
  isDeleteDisabled,
  onToggleDeleteModal,
}) {
  isDeleteDisabled = !canEdit || isDeleteDisabled;
  const match = useRouteMatch();
  return (
    <Toolbar id="survey-toolbar">
      <ToolbarContent>
        <ToolbarItem>
          <Checkbox
            isDisabled={!canEdit}
            isChecked={isAllSelected}
            onChange={(isChecked) => {
              onSelectAll(isChecked);
            }}
            aria-label={i18n._(t`Select all`)}
            id="select-all"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Switch
            aria-label={i18n._(t`Survey Toggle`)}
            id="survey-toggle"
            label={i18n._(t`On`)}
            labelOff={i18n._(t`Off`)}
            isChecked={surveyEnabled}
            isDisabled={!canEdit}
            onChange={() => onToggleSurvey(!surveyEnabled)}
          />
        </ToolbarItem>
        <ToolbarGroup>
          <ToolbarItem>
            <ToolbarAddButton
              isDisabled={!canEdit}
              linkTo={`${match.url}/add`}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button
              variant="danger"
              isDisabled={isDeleteDisabled}
              onClick={() => onToggleDeleteModal(true)}
            >
              {i18n._(t`Delete`)}
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}

export default withI18n()(SurveyToolbar);

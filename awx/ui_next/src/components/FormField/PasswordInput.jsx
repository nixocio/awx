import { t } from '@lingui/macro';
import { withI18n } from '@lingui/react';
import {
  Button,
  ButtonVariant,
  TextInput,
  Tooltip,
} from '@patternfly/react-core';
import { EyeIcon, EyeSlashIcon } from '@patternfly/react-icons';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function PasswordInput(props) {
  const { id, name, validate, isRequired, isDisabled, i18n } = props;
  const [inputType, setInputType] = useState('password');
  const [field, meta] = useField({ name, validate });

  const isValid = !(meta.touched && meta.error);

  const handlePasswordToggle = () => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

  return (
    <>
      <Tooltip
        content={inputType === 'password' ? i18n._(t`Show`) : i18n._(t`Hide`)}
      >
        <Button
          variant={ButtonVariant.control}
          aria-label={i18n._(t`Toggle Password`)}
          onClick={handlePasswordToggle}
          isDisabled={isDisabled}
        >
          {inputType === 'password' && <EyeSlashIcon />}
          {inputType === 'text' && <EyeIcon />}
        </Button>
      </Tooltip>
      <TextInput
        id={id}
        placeholder={field.value === '$encrypted$' ? 'ENCRYPTED' : undefined}
        {...field}
        value={field.value === '$encrypted$' ? '' : field.value}
        isDisabled={isDisabled}
        isRequired={isRequired}
        validated={isValid ? 'default' : 'error'}
        type={inputType}
        onChange={(_, event) => {
          field.onChange(event);
        }}
      />
    </>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

PasswordInput.defaultProps = {
  validate: () => {},
  isRequired: false,
  isDisabled: false,
};

export default withI18n()(PasswordInput);

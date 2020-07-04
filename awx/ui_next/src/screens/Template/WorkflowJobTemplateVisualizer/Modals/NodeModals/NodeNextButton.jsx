import { Button } from '@patternfly/react-core';
import { func, number, shape, string } from 'prop-types';
import React, { useEffect } from 'react';

function NodeNextButton({
  activeStep,
  buttonText,
  onClick,
  onNext,
  triggerNext,
}) {
  useEffect(() => {
    if (!triggerNext) {
      return;
    }
    onNext();
  }, [onNext, triggerNext]);

  return (
    <Button
      id="next-node-modal"
      variant="primary"
      type="submit"
      onClick={() => onClick(activeStep)}
      isDisabled={!activeStep.enableNext}
    >
      {buttonText}
    </Button>
  );
}

NodeNextButton.propTypes = {
  activeStep: shape().isRequired,
  buttonText: string.isRequired,
  onClick: func.isRequired,
  onNext: func.isRequired,
  triggerNext: number.isRequired,
};

export default NodeNextButton;

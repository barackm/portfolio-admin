import { Tooltip as MuiTooltip } from '@mui/material';
import React, { ReactElement } from 'react';

interface TooltipProps {
  title: string;
  children: ReactElement<any, any>;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Tooltip = (props: TooltipProps) => {
  const { placement, title, children } = props;
  return (
    <MuiTooltip title={title} placement={placement}>
      <span>{children}</span>
    </MuiTooltip>
  );
};

Tooltip.defaultProps = {
  placement: 'top',
};

export default Tooltip;

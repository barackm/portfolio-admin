import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface LoadingIndicatorProps {
  visible?: boolean;
  width?: number;
  strokeWidth?: number;
  strokeColor?: string;
  animationDuration?: number;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { visible, width, strokeWidth, strokeColor, animationDuration } = props;
  return (
    <div>
      <RotatingLines
        strokeColor={strokeColor}
        strokeWidth={`${strokeWidth}`}
        animationDuration={`${animationDuration}`}
        width={`${width}`}
        visible={visible}
      />
    </div>
  );
};

LoadingIndicator.defaultProps = {
  visible: true,
  width: 47,
  strokeWidth: 5,
  strokeColor: 'grey',
  animationDuration: 1.2,
};

export default LoadingIndicator;

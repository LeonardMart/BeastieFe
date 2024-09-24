import React, {forwardRef} from 'react';
import {Svg, Path, Circle} from 'react-native-svg';

const FilledRadio = forwardRef<React.ComponentProps<typeof Svg>, any>(
  ({color = '#4871F7', ...props}, ref) => (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle
        cx="10"
        cy="10"
        r="7.5"
        fill="#4871F7"
        stroke="#CCE0FF"
        stroke-width="5"
      />
    </Svg>
  ),
);

export default FilledRadio;

import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

const FemaleIcon = forwardRef<React.ComponentProps<typeof Svg>, any>(
  (props, ref) => (
    <Svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4 7.5C4.79565 7.5 5.55871 7.18393 6.12132 6.62132C6.68393 6.05871 7 5.29565 7 4.5C7 3.70435 6.68393 2.94129 6.12132 2.37868C5.55871 1.81607 4.79565 1.5 4 1.5C3.20435 1.5 2.44129 1.81607 1.87868 2.37868C1.31607 2.94129 1 3.70435 1 4.5C1 5.29565 1.31607 6.05871 1.87868 6.62132C2.44129 7.18393 3.20435 7.5 4 7.5ZM4 7.5V9.5M4 9.5V10.5M4 9.5H3M4 9.5H5"
        stroke="#F43F5E"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  ),
);

export default FemaleIcon;

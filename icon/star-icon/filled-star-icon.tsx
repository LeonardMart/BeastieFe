import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';
import {getColor} from '../colorUtils';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const FilledStarIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
  ({...props}, ref) => (
    <Svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.8337 4.89082C11.892 4.59915 11.6587 4.24915 11.367 4.24915L8.04199 3.78248L6.52533 0.74915C6.46699 0.632484 6.40866 0.57415 6.29199 0.515817C6.00033 0.340817 5.65033 0.457484 5.47533 0.74915L4.01699 3.78248L0.691992 4.24915C0.516992 4.24915 0.400326 4.30748 0.341992 4.42415C0.108659 4.65748 0.108659 5.00748 0.341992 5.24082L2.73366 7.57415L2.15033 10.8991C2.15033 11.0158 2.15033 11.1325 2.20866 11.2491C2.38366 11.5408 2.73366 11.6575 3.02533 11.4825L6.00033 9.90748L8.97533 11.4825C9.03366 11.5408 9.15033 11.5408 9.26699 11.5408H9.38366C9.67533 11.4825 9.90866 11.1908 9.85033 10.8408L9.26699 7.51582L11.6587 5.18248C11.7753 5.12415 11.8337 5.00748 11.8337 4.89082Z"
        fill="#F9B42D"
      />
    </Svg>
  ),
);

export default FilledStarIcon;

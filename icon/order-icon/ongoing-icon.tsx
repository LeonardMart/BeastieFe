
import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';
import { getColor } from '../colorUtils';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const OngoingOrderIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
  ({...props}, ref) => {
    return (
        <Svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M6.61317 10.0807C6.59858 10.0382 6.5784 9.99782 6.55317 9.96065C6.52856 9.92573 6.50184 9.89233 6.47317 9.86065C6.37942 9.76815 6.26037 9.70548 6.13105 9.68057C6.00172 9.65565 5.86791 9.6696 5.7465 9.72065C5.66467 9.75238 5.58991 9.79996 5.5265 9.86065C5.49783 9.89233 5.47112 9.92573 5.4465 9.96065C5.42127 9.99782 5.4011 10.0382 5.3865 10.0807C5.36728 10.1184 5.3538 10.1589 5.3465 10.2007C5.34354 10.245 5.34354 10.2896 5.3465 10.334C5.34425 10.4214 5.36252 10.5082 5.39984 10.5873C5.4336 10.6681 5.48095 10.7425 5.53984 10.8073C5.66236 10.9289 5.82726 10.9982 5.99984 11.0007C6.08729 11.0029 6.17405 10.9846 6.25317 10.9473C6.3359 10.9174 6.41103 10.8696 6.47325 10.8074C6.53546 10.7452 6.58323 10.67 6.61317 10.5873C6.65049 10.5082 6.66876 10.4214 6.6665 10.334C6.66947 10.2896 6.66947 10.245 6.6665 10.2007C6.65503 10.1581 6.63703 10.1177 6.61317 10.0807ZM11.3332 4.96065C11.3262 4.89941 11.3128 4.83907 11.2932 4.78065V4.72065C11.2611 4.6521 11.2184 4.58909 11.1665 4.53398L7.1665 0.533984C7.11139 0.482128 7.04838 0.439372 6.97984 0.407318H6.91984C6.85211 0.368479 6.77732 0.343547 6.69984 0.333984H2.6665C2.13607 0.333984 1.62736 0.544698 1.25229 0.919771C0.877218 1.29484 0.666504 1.80355 0.666504 2.33398V11.6673C0.666504 12.1978 0.877218 12.7065 1.25229 13.0815C1.62736 13.4566 2.13607 13.6673 2.6665 13.6673H9.33317C9.8636 13.6673 10.3723 13.4566 10.7474 13.0815C11.1225 12.7065 11.3332 12.1978 11.3332 11.6673V5.00065V4.96065ZM7.33317 2.60732L9.05984 4.33398H7.99984C7.82303 4.33398 7.65346 4.26375 7.52843 4.13872C7.40341 4.0137 7.33317 3.84413 7.33317 3.66732V2.60732ZM9.99984 11.6673C9.99984 11.8441 9.9296 12.0137 9.80458 12.1387C9.67955 12.2637 9.50998 12.334 9.33317 12.334H2.6665C2.48969 12.334 2.32012 12.2637 2.1951 12.1387C2.07008 12.0137 1.99984 11.8441 1.99984 11.6673V2.33398C1.99984 2.15717 2.07008 1.9876 2.1951 1.86258C2.32012 1.73756 2.48969 1.66732 2.6665 1.66732H5.99984V3.66732C5.99984 4.19775 6.21055 4.70646 6.58562 5.08153C6.9607 5.4566 7.4694 5.66732 7.99984 5.66732H9.99984V11.6673ZM5.99984 6.33398C5.82303 6.33398 5.65346 6.40422 5.52843 6.52925C5.40341 6.65427 5.33317 6.82384 5.33317 7.00065V8.33398C5.33317 8.5108 5.40341 8.68037 5.52843 8.80539C5.65346 8.93041 5.82303 9.00065 5.99984 9.00065C6.17665 9.00065 6.34622 8.93041 6.47124 8.80539C6.59627 8.68037 6.6665 8.5108 6.6665 8.33398V7.00065C6.6665 6.82384 6.59627 6.65427 6.47124 6.52925C6.34622 6.40422 6.17665 6.33398 5.99984 6.33398Z"
          fill={getColor(props.color)}
        />
      </Svg>
    );
  },
);

export default OngoingOrderIcon;

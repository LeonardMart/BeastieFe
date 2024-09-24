import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const LocationIconSolid = forwardRef<
  React.ComponentProps<typeof Svg> & IIcon,
  any
>(({...props}, ref) => {
  const getColor = (color: string) => {
    if (color == 'neutral-500') {
      return '#64748B';
    } else if (color == 'neutral-800') {
      return '#1E293B';
    } else if (color == 'red-500') {
      return '#F43F5E';
    } else if (color == 'red-800') {
      return '#730D29';
    } else if (color == 'primary-500') {
      return '#4871F7';
    } else if (color == 'primary-800') {
      return '#223B8C';
    } else {
      return '#4871F7';
    }
  };
  return (
    <Svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.22811 1.89547C3.22831 0.895277 4.58486 0.333374 5.99935 0.333374C7.41384 0.333374 8.77039 0.895277 9.77059 1.89547C10.7708 2.89567 11.3327 4.25222 11.3327 5.66671C11.3327 9.26671 6.66602 13.3334 6.43268 13.5067C6.31193 13.61 6.15825 13.6668 5.99935 13.6668C5.84045 13.6668 5.68677 13.61 5.56602 13.5067L5.56491 13.5057C5.34935 13.3189 0.666016 9.26032 0.666016 5.66671C0.666016 4.25222 1.22792 2.89567 2.22811 1.89547ZM4.51767 3.44941C4.9562 3.1564 5.47177 3 5.99919 3C6.70643 3 7.38471 3.28095 7.88481 3.78105C8.3849 4.28115 8.66585 4.95942 8.66585 5.66667C8.66585 6.19408 8.50946 6.70966 8.21644 7.14819C7.92342 7.58672 7.50695 7.92851 7.01968 8.13035C6.53241 8.33218 5.99623 8.38499 5.47895 8.28209C4.96166 8.1792 4.48651 7.92523 4.11357 7.55229C3.74063 7.17935 3.48665 6.70419 3.38376 6.18691C3.28087 5.66963 3.33367 5.13345 3.53551 4.64618C3.73734 4.15891 4.07914 3.74243 4.51767 3.44941Z"
        fill="#64748B"
      />
    </Svg>
  );
});

export default LocationIconSolid;

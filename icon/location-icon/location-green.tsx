import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const GreenLocationIcon = forwardRef<
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.22811 2.89547C5.22831 1.89528 6.58486 1.33337 7.99935 1.33337C9.41384 1.33337 10.7704 1.89528 11.7706 2.89547C12.7708 3.89567 13.3327 5.25222 13.3327 6.66671C13.3327 10.2667 8.66602 14.3334 8.43268 14.5067C8.31193 14.61 8.15825 14.6668 7.99935 14.6668C7.84045 14.6668 7.68677 14.61 7.56602 14.5067L7.56491 14.5057C7.34935 14.3189 2.66602 10.2603 2.66602 6.66671C2.66602 5.25222 3.22792 3.89567 4.22811 2.89547ZM6.51767 4.44941C6.9562 4.1564 7.47177 4 7.99919 4C8.70643 4 9.38471 4.28095 9.88481 4.78105C10.3849 5.28115 10.6659 5.95942 10.6659 6.66667C10.6659 7.19408 10.5095 7.70966 10.2164 8.14819C9.92342 8.58672 9.50695 8.92851 9.01968 9.13035C8.53241 9.33218 7.99623 9.38499 7.47895 9.28209C6.96166 9.1792 6.48651 8.92523 6.11357 8.55229C5.74063 8.17935 5.48665 7.70419 5.38376 7.18691C5.28087 6.66963 5.33367 6.13345 5.53551 5.64618C5.73734 5.15891 6.07914 4.74243 6.51767 4.44941Z"
        fill="#359766"
      />
    </Svg>
  );
});

export default GreenLocationIcon;

import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const BackArrow = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
  ({...props}, ref) => {
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
        ref={ref}
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M3.28994 5.99995L6.82994 2.45995C7.01619 2.27259 7.12074 2.01913 7.12074 1.75495C7.12074 1.49076 7.01619 1.23731 6.82994 1.04995C6.73698 0.95622 6.62638 0.881826 6.50452 0.831057C6.38266 0.780288 6.25196 0.75415 6.11994 0.75415C5.98793 0.75415 5.85723 0.780288 5.73537 0.831057C5.61351 0.881826 5.50291 0.95622 5.40994 1.04995L1.16994 5.28995C1.07622 5.38291 1.00182 5.49351 0.951053 5.61537C0.900284 5.73723 0.874146 5.86794 0.874146 5.99995C0.874146 6.13196 0.900284 6.26267 0.951053 6.38453C1.00182 6.50638 1.07622 6.61699 1.16994 6.70995L5.40994 10.9999C5.50338 11.0926 5.6142 11.166 5.73604 11.2157C5.85787 11.2655 5.98834 11.2907 6.11994 11.2899C6.25155 11.2907 6.38201 11.2655 6.50385 11.2157C6.62569 11.166 6.7365 11.0926 6.82994 10.9999C7.01619 10.8126 7.12074 10.5591 7.12074 10.2949C7.12074 10.0308 7.01619 9.77731 6.82994 9.58995L3.28994 5.99995Z"
          fill={getColor(props.color)}
        />
      </Svg>
    );
  },
);

export default BackArrow;

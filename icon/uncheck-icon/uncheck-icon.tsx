import React, {forwardRef} from 'react';
import {Svg, Path, Rect} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const UncheckIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
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
        return '#F9B42D';
      }
    };
    return (
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Rect x="0.5" y="0.5" width="23" height="23" rx="7.5" fill="white" />
        <Rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="7.5"
          stroke="#94A3B8"
        />
      </Svg>
    );
  },
);

export default UncheckIcon;

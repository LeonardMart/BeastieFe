import React, {forwardRef} from 'react';
import {Svg, Path, Rect} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const CheckIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
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
        <Rect width="24" height="24" rx="8" fill="#4871F7" />
        <Path
          d="M16.473 8.8067C16.411 8.74421 16.3373 8.69461 16.256 8.66077C16.1748 8.62692 16.0876 8.6095 15.9996 8.6095C15.9116 8.6095 15.8245 8.62692 15.7433 8.66077C15.662 8.69461 15.5883 8.74421 15.5263 8.8067L10.5596 13.78L8.47297 11.6867C8.40863 11.6245 8.33267 11.5757 8.24943 11.5429C8.16619 11.5101 8.07731 11.494 7.98786 11.4955C7.8984 11.4971 7.81013 11.5162 7.72808 11.5519C7.64602 11.5875 7.5718 11.639 7.50964 11.7034C7.44748 11.7677 7.39861 11.8437 7.3658 11.9269C7.333 12.0101 7.31691 12.099 7.31846 12.1885C7.32001 12.2779 7.33916 12.3662 7.37482 12.4483C7.41049 12.5303 7.46196 12.6045 7.52631 12.6667L10.0863 15.2267C10.1483 15.2892 10.222 15.3388 10.3033 15.3726C10.3845 15.4065 10.4716 15.4239 10.5596 15.4239C10.6476 15.4239 10.7348 15.4065 10.816 15.3726C10.8973 15.3388 10.971 15.2892 11.033 15.2267L16.473 9.7867C16.5406 9.72427 16.5946 9.6485 16.6316 9.56417C16.6685 9.47983 16.6876 9.38876 16.6876 9.2967C16.6876 9.20463 16.6685 9.11356 16.6316 9.02923C16.5946 8.94489 16.5406 8.86912 16.473 8.8067Z"
          fill="white"
        />
      </Svg>
    );
  },
);

export default CheckIcon;

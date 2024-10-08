import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const OtherTypeIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
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
        return '#F43F5E';
      }
    };
    return (

      <Svg
      width={props.width != undefined ? props.width : '18'}
      height={props.height != undefined ? props.height : '16'}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.8001 2.16672C14.9167 1.28106 13.7457 0.740507 12.4987 0.642698C11.2516 0.54489 10.0107 0.896278 9.00007 1.63339C7.93978 0.844754 6.62006 0.487149 5.30667 0.632588C3.99327 0.778026 2.78377 1.4157 1.92171 2.41721C1.05966 3.41872 0.609085 4.70966 0.660734 6.03007C0.712383 7.35048 1.26242 8.60228 2.20007 9.53339L7.37507 14.7167C7.80842 15.1432 8.39206 15.3822 9.00007 15.3822C9.60808 15.3822 10.1917 15.1432 10.6251 14.7167L15.8001 9.53339C16.7731 8.55444 17.3192 7.23028 17.3192 5.85006C17.3192 4.46983 16.7731 3.14567 15.8001 2.16672ZM14.6251 8.38339L9.45007 13.5584C9.39118 13.6179 9.32109 13.6651 9.24385 13.6973C9.16661 13.7295 9.08375 13.7461 9.00007 13.7461C8.91638 13.7461 8.83352 13.7295 8.75628 13.6973C8.67904 13.6651 8.60896 13.6179 8.55007 13.5584L3.37507 8.35839C2.72153 7.69034 2.35558 6.79294 2.35558 5.85839C2.35558 4.92384 2.72153 4.02644 3.37507 3.35839C4.04103 2.70088 4.93921 2.3322 5.87507 2.3322C6.81092 2.3322 7.7091 2.70088 8.37507 3.35839C8.45254 3.4365 8.5447 3.49849 8.64625 3.5408C8.7478 3.58311 8.85672 3.60489 8.96673 3.60489C9.07674 3.60489 9.18567 3.58311 9.28721 3.5408C9.38876 3.49849 9.48093 3.4365 9.5584 3.35839C10.2244 2.70088 11.1225 2.3322 12.0584 2.3322C12.9943 2.3322 13.8924 2.70088 14.5584 3.35839C15.2209 4.01768 15.5989 4.91022 15.6114 5.84479C15.6238 6.77937 15.2698 7.68167 14.6251 8.35839V8.38339Z"
        fill={getColor(props.color)}
      />
    </Svg>
    );
  },
);

export default OtherTypeIcon;

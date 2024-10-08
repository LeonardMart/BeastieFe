import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const LoveIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
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
        width={props.w != undefined ? props.w : '20'}
        height={props.h != undefined ? props.h : '21'}
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M19.1603 2.60981C18.0986 1.54782 16.691 0.90214 15.1935 0.790195C13.696 0.67825 12.2081 1.10748 11.0003 1.99981C9.72793 1.05345 8.14427 0.624325 6.5682 0.798851C4.99212 0.973377 3.54072 1.73859 2.50625 2.9404C1.47178 4.14221 0.931098 5.69133 0.993077 7.27583C1.05506 8.86032 1.71509 10.3625 2.84028 11.4798L10.2903 18.9298C10.3832 19.0235 10.4938 19.0979 10.6157 19.1487C10.7376 19.1995 10.8683 19.2256 11.0003 19.2256C11.1323 19.2256 11.263 19.1995 11.3849 19.1487C11.5067 19.0979 11.6173 19.0235 11.7103 18.9298L19.1603 11.4798C19.7429 10.8975 20.2051 10.2062 20.5205 9.44518C20.8358 8.6842 20.9982 7.86854 20.9982 7.04481C20.9982 6.22108 20.8358 5.40542 20.5205 4.64445C20.2051 3.88347 19.7429 3.19209 19.1603 2.60981ZM17.7503 10.0698L11.0003 16.8098L4.25028 10.0698C3.65545 9.47251 3.25025 8.71286 3.0855 7.88615C2.92076 7.05945 3.00381 6.2025 3.32423 5.42281C3.64465 4.64312 4.18817 3.97541 4.88662 3.50344C5.58507 3.03147 6.40734 2.77625 7.25028 2.76981C8.37639 2.77257 9.45537 3.22215 10.2503 4.01981C10.3432 4.11354 10.4538 4.18794 10.5757 4.23871C10.6976 4.28947 10.8283 4.31561 10.9603 4.31561C11.0923 4.31561 11.223 4.28947 11.3449 4.23871C11.4667 4.18794 11.5773 4.11354 11.6703 4.01981C12.4886 3.3107 13.5458 2.93896 14.6278 2.97984C15.7099 3.02072 16.736 3.47116 17.4985 4.24C18.2609 5.00884 18.7029 6.03865 18.7348 7.121C18.7667 8.20335 18.3862 9.2574 17.6703 10.0698H17.7503Z"
          fill={getColor(props.color)}
        />
      </Svg>
    );
  },
);

export default LoveIcon;

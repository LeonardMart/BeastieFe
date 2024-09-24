import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';
import {getColor} from '../colorUtils';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const MoneyIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
  ({...props}, ref) => (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 11C5.80222 11 5.60888 11.0586 5.44443 11.1685C5.27998 11.2784 5.15181 11.4346 5.07612 11.6173C5.00043 11.8 4.98063 12.0011 5.01921 12.1951C5.0578 12.3891 5.15304 12.5673 5.29289 12.7071C5.43275 12.847 5.61093 12.9422 5.80491 12.9808C5.99889 13.0194 6.19996 12.9996 6.38268 12.9239C6.56541 12.8482 6.72159 12.72 6.83147 12.5556C6.94135 12.3911 7 12.1978 7 12C7 11.7348 6.89464 11.4804 6.70711 11.2929C6.51957 11.1054 6.26522 11 6 11ZM18 11C17.8022 11 17.6089 11.0586 17.4444 11.1685C17.28 11.2784 17.1518 11.4346 17.0761 11.6173C17.0004 11.8 16.9806 12.0011 17.0192 12.1951C17.0578 12.3891 17.153 12.5673 17.2929 12.7071C17.4327 12.847 17.6109 12.9422 17.8049 12.9808C17.9989 13.0194 18.2 12.9996 18.3827 12.9239C18.5654 12.8482 18.7216 12.72 18.8315 12.5556C18.9414 12.3911 19 12.1978 19 12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11ZM20 5H4C3.20435 5 2.44129 5.31607 1.87868 5.87868C1.31607 6.44129 1 7.20435 1 8V16C1 16.7956 1.31607 17.5587 1.87868 18.1213C2.44129 18.6839 3.20435 19 4 19H20C20.7956 19 21.5587 18.6839 22.1213 18.1213C22.6839 17.5587 23 16.7956 23 16V8C23 7.20435 22.6839 6.44129 22.1213 5.87868C21.5587 5.31607 20.7956 5 20 5ZM21 16C21 16.2652 20.8946 16.5196 20.7071 16.7071C20.5196 16.8946 20.2652 17 20 17H4C3.73478 17 3.48043 16.8946 3.29289 16.7071C3.10536 16.5196 3 16.2652 3 16V8C3 7.73478 3.10536 7.48043 3.29289 7.29289C3.48043 7.10536 3.73478 7 4 7H20C20.2652 7 20.5196 7.10536 20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V16ZM12 9C11.4067 9 10.8266 9.17595 10.3333 9.50559C9.83994 9.83524 9.45542 10.3038 9.22836 10.8519C9.0013 11.4001 8.94189 12.0033 9.05764 12.5853C9.1734 13.1672 9.45912 13.7018 9.87868 14.1213C10.2982 14.5409 10.8328 14.8266 11.4147 14.9424C11.9967 15.0581 12.5999 14.9987 13.1481 14.7716C13.6962 14.5446 14.1648 14.1601 14.4944 13.6667C14.8241 13.1734 15 12.5933 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 13C11.8022 13 11.6089 12.9414 11.4444 12.8315C11.28 12.7216 11.1518 12.5654 11.0761 12.3827C11.0004 12.2 10.9806 11.9989 11.0192 11.8049C11.0578 11.6109 11.153 11.4327 11.2929 11.2929C11.4327 11.153 11.6109 11.0578 11.8049 11.0192C11.9989 10.9806 12.2 11.0004 12.3827 11.0761C12.5654 11.1518 12.7216 11.28 12.8315 11.4444C12.9414 11.6089 13 11.8022 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13Z"
        fill={getColor(props.color)}
      />
    </Svg>
  ),
);

export default MoneyIcon;

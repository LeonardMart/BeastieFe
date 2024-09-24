import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const DogTypeIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
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
        width={props.width ? props.width : '20'}
        height={props.height ? props.height : '19'}
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <Path
          d="M15.7383 5.18613L13.4427 1.87004C13.2725 1.62478 13.0464 1.42359 12.783 1.28316C12.5196 1.14272 12.2265 1.06708 11.928 1.0625L7.57148 1H7.5625C5.31332 1 3.58762 1.37621 2.47617 3.21227C1.44141 4.92133 1 7.83262 1 12.9467V13.5717H2.42801L1.50875 18.2592H2.78258L3.70184 13.5717H4.125C5.14577 13.5808 6.12916 13.188 6.86281 12.4782C7.52605 11.8436 8.00445 10.9754 8.24637 9.96754L8.24855 9.95848L9.32055 4.82168H8.04359L7.02879 9.68449C6.71973 10.9611 5.79555 12.3217 4.125 12.3217H2.25234C2.28629 7.89723 2.68914 5.27406 3.54551 3.85941C4.26426 2.67191 5.31484 2.25039 7.55816 2.2498L11.91 2.3123C12.0095 2.31382 12.1072 2.33903 12.195 2.38584C12.2828 2.43265 12.3582 2.49972 12.4149 2.58148L15.0117 6.33223L18.5 6.91363V7.57609L17.9183 10.6785C17.7466 11.5941 17.4531 12.0554 16.2496 12.2L11.3158 13.0441L11.2832 18.2592H12.5332L12.5592 14.0993L16.4147 13.4391C17.2881 13.3318 17.9325 13.0503 18.3845 12.5789C18.7708 12.1758 19.0059 11.6609 19.1469 10.9089L19.75 7.69227V5.85473L15.7383 5.18613Z"
          fill={getColor(props.color)}
          stroke={getColor(props.color)}
          stroke-width="0.5"
        />
      </Svg>
    );
  },
);

export default DogTypeIcon;

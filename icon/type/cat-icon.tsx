import React, {forwardRef} from 'react';
import {Svg, Path} from 'react-native-svg';

interface IIcon {
  color: string;
  w?: string;
  h?: string;
}

const CatTypeIcon = forwardRef<React.ComponentProps<typeof Svg> & IIcon, any>(
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
      width={props.width != undefined ? props.width:"18"}
      height={props.height != undefined ? props.height:"20"}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.7014 7.45758C14.5593 7.039 14.2895 6.67554 13.93 6.41833C13.5705 6.16112 13.1394 6.02312 12.6973 6.02375H10.9998V1L10.2864 1.10191C8.66809 1.33309 7.4075 2.15316 6.54004 3.53941C5.91461 4.53867 5.62387 5.64098 5.48895 6.46543C4.55742 7.18215 3.74703 8.16898 3.0773 9.40293C2.51289 10.4427 2.04566 11.6614 1.68855 13.0252C1.08516 15.3295 1.00348 17.2408 1.00031 17.3211L1 19.5331H2.2498V17.3598C2.26543 17.0383 2.65902 10.0024 6.43074 7.32328L6.65184 7.16621L6.68816 6.89742C6.87625 5.50578 7.52625 3.20727 9.7498 2.50074V7.27375H12.6973C12.8781 7.27321 13.0544 7.32935 13.2016 7.43428C13.3487 7.53921 13.4593 7.68763 13.5177 7.85867C14.016 9.32961 14.8722 11.1703 16.2067 12.0353L15.8054 13.5403C15.6657 14.077 15.3479 14.5504 14.9041 14.883C14.4603 15.2156 13.9167 15.3877 13.3624 15.3711C12.2425 15.3375 11.077 15.4836 9.89797 15.8052L9.4373 15.9307V19.5331H10.6873V16.8952C11.5511 16.6911 12.4375 16.5988 13.3248 16.6205C14.1604 16.6436 14.9793 16.3837 15.6487 15.8831C16.3182 15.3824 16.7989 14.6704 17.013 13.8623L17.6805 11.3592L17.1834 11.1461C16.2537 10.7477 15.3723 9.43773 14.7014 7.45758Z"
        fill={getColor(props.color)}
          stroke={getColor(props.color)}
        stroke-width="0.5"
      />
    </Svg>
    );
  },
);

export default CatTypeIcon;


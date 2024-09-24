import {FC} from 'react';
import {Modal, TouchableOpacity} from 'react-native';


const transparent = `rgba(0,0,0,0.5)`;
const Background: FC = () => {
  return (
    <TouchableOpacity
      style={{backgroundColor: transparent, height: '100%'}}
    />
  );
};

export default Background;

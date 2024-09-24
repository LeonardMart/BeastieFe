import { FC } from "react";
import { TouchableOpacity } from "react-native";

interface IBackground{
    onPress?: ()=>void
}

const transparent = `rgba(0,0,0,0.5)`;
const Background:FC<IBackground> = ({onPress}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={{backgroundColor: transparent, height: '100%'}}/>
    )
}

export default Background
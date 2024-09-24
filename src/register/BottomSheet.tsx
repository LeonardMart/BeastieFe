import React, { FC } from "react";
import { Dimensions, Text, View } from "react-native";

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const BottomSheet: FC = () =>{
    return(
        <View className='bg-red-300 w-full absolute rounded-3xl'style={{height: SCREEN_HEIGHT, top: SCREEN_HEIGHT/1.5}}>
            <Text>asdasd</Text>
        </View>
    )
}

export default BottomSheet
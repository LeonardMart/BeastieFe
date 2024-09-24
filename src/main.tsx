import React, {FC, useEffect} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Beastie from '../icon/beastie/beastie';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';

interface login {
  navigation: any;
}

const Main: FC<login> = ({navigation}) => {
  const userInfo = useSelector((state: RootState) => state.user?.userInfo);

  const handleLogin = () => {
    navigation.navigate('navigateToLogin');
  };
  const handleRegist = () => {
    navigation.navigate('navigateToRegister');
  };

  console.log('anjay', userInfo);

  return (
    <View className="h-full py-4 w-full items-center bg-[#FFFFFF] justify-between">
      <View className="w-full items-center">
        <Beastie />
        <View className="w-full flex flex-col justify-center items-center space-y-8 mt-10">
          <Image source={require('../logo/women-cat-background.png')} />
          <View className="flex flex-col space-y-3 items-center justify-center">
            <Text className="font-extrabold text-xl text-neutral-800">
              Welcome to Beastie!
            </Text>
            <Text className="font-normal text-sm text-neutral-500 text-center">
              Rest easy knowing your furry friend is in good hands. Reliable,
              personalized, and always there for your pet's well-being.
            </Text>
          </View>
        </View>
      </View>

      <View className="flex flex-col w-full px-4 space-y-4">
        <TouchableOpacity
          onPress={handleRegist}
          className="w-full h-12 rounded-2xl justify-center items-center bg-primary-500">
          <Text className="font-semibold text-sm text-[#FFFFFF]">
            Get Started
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center">
          <Text className="font-semibold text-sm text-neutral-500">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text className="font-semibold text-sm text-primary-500">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Main;

import React, {FC, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackArrow from '../../icon/back-arrow/back-arrow';
import RoundWarning from '../../icon/round-warning/round-warning';
import {useNavigation} from '@react-navigation/native';
// import { useRegister } from './RegisterContext';
import {RegisterContext} from './RegisterMain';
import {useHttpRequest} from '../../hooks/useHttpRequest';

interface IIndex {
  selectedIndex: (a: number) => void;
}

const Register: FC<IIndex> = ({selectedIndex}) => {
  const navigation = useNavigation();
  const {sendRequest} = useHttpRequest();

  // const { name, email, password, setName, setEmail, setPassword } = useRegister();
  const registerContext = useContext(RegisterContext);

  const handleOnBack = () => {
    navigation.navigate('navigateToMain' as never);
  };

  const handleOnNext = () => {
    selectedIndex(1);
  };

  return (
    <View className="bg-[#FFFFFF] flex flex-col h-full py-4 justify-between">
      <View>
        <View className="px-4 space-y-8">
          <TouchableOpacity
            onPress={handleOnBack}
            className="bg-neutral-100 w-9 h-9 rounded-2xl justify-center items-center p-6">
            <BackArrow />
          </TouchableOpacity>
          <View className="w-full space-y-2">
            <Text className="text-lg font-bold text-neutral-800">
              Hi Let's Get You Registered!
            </Text>
            <Text>Please fill in your detaild information.</Text>
          </View>
        </View>

        <View className="flex flex-col space-y-4 mt-8 w-full px-4">
          <View className="flex flex-col gap-4">
            <View className="flex flex-col gap-[2px] rounded-md bg-[#FFFFFF]">
              <Text className="text-neutral-800 text-xs font-bold">Name</Text>
              <TextInput
                value={registerContext?.name}
                onChangeText={registerContext?.setName}
                placeholderTextColor="#64748B"
                placeholder="Enter your name"
                className="bg-neutral-100 px-2 rounded-md"
              />
            </View>
            <View className="flex flex-col gap-[2px] rounded-md">
              <Text className="text-neutral-800 text-xs font-bold">
                Email Address
              </Text>
              <TextInput
                value={registerContext?.email}
                onChangeText={registerContext?.setEmail}
                placeholderTextColor="#64748B"
                placeholder="email@address.com"
                className="bg-neutral-100 px-2 rounded-md"
              />
            </View>
            <View className="flex flex-col gap-[2px] rounded-md">
              <Text className="text-neutral-800 text-xs font-bold">
                Phone Number
              </Text>
              <View className="bg-neutral-100 px-2 flex flex-row space-x-2.5 items-center rounded-md">
                <Text>+62</Text>
                <TextInput
                  value={registerContext?.phoneNum}
                  onChangeText={registerContext?.setPhoneNum}
                  placeholderTextColor="#64748B"
                  placeholder="8XXX XXXX XXX"
                  
                />
              </View>
            </View>
            <View className="flex flex-col gap-[2px] rounded-md">
              <Text className="text-neutral-800 text-xs font-bold">
                Password
              </Text>
              <TextInput
                value={registerContext?.password}
                onChangeText={registerContext?.setPassword}
                placeholderTextColor="#64748B"
                placeholder="Enter your password"
                className="bg-neutral-100 px-2 rounded-md"
              />
            </View>
          </View>

          <View className="flex flex-row justify-center items-center space-x-4 bg-sky-100 w-full rounded-xl py-1.5 px-3">
            <RoundWarning />
            <Text className="leading-5">
              By registering and logging in, you are agree to our{' '}
              <Text className="text-primary-500 font-semibold">
                Privacy Policy{' '}
              </Text>
              and{' '}
              <Text className="text-primary-500 font-semibold">
                Terms of Services.
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View className="flex w-full px-4">
        <TouchableOpacity
          onPress={handleOnNext}
          className="bg-primary-500 w-full py-3 rounded-2xl shadow-md shadow-black">
          <Text className="text-center font-bold text-lg text-[#FFFFFF]">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

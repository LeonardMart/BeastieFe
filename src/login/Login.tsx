import React, {FC, useEffect, useState} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import BackArrow from '../../icon/back-arrow/back-arrow';
import axios from 'axios';
import {saveUserInfo} from '../../store/pet-owner/action';
import {saveUserOrderInfo} from '../../store/pet-owner/order/orderAction';
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch hook
import {useHttpRequest} from '../../hooks/useHttpRequest';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../../store/store';

interface ILogin {
  navigation: any;
}

interface IUserData {
  userid: string;
  username: string;
  email: string;
  phone: string;
  pets: IPet[];
  useraddress: IAddress[];
  pf_flag: boolean;
}
interface IAddress {
  id: number;
  label: string;
  detailAddress: string;
  latitude: string;
  longitude: string;
}

interface IPet {
  id: number;
  name: string;
  gender: string;
  dob: string;
  breed: string;
  type: string;
}

const Login: FC<ILogin> = ({navigation}) => {
  const Baseurl = `http://10.0.2.2:4000/authlogin`;
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const {sendRequest} = useHttpRequest(Baseurl);
  const Base = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest: getRequest} = useHttpRequest(Base);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<IUserData[]>([]);
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook
  const handleOnBack = () => {
    navigation.navigate('navigateToMain');
  };

  const loginHandler = async () => {
    const res = await sendRequest({
      url: `/login/${email}/${password}`,
      method: 'get',
    });
    console.log('res', res);
    if (res.status == 1) {
      dispatch(saveUserInfo(res.data[0]));
      setData(res.data[0]);
      const encryptedData = JSON.stringify({email, password});
      await AsyncStorage.setItem('session', encryptedData);

      navigation.navigate('navigateToHome' as never);
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Wrong Credential or User Not Found',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
      );
    }
  };

  const getOrderList = async () => {
    const res = await getRequest({
      url: `/retrieveOwnerOrder/${userInfo?.userid}`,
      method: 'get',
    });
    if (res.status == 1) {
      dispatch(saveUserOrderInfo(res.data));
    }
  };
  useEffect(() => {
    getOrderList().catch(e => console.log('error retrieve order history', e));
  }, [userInfo]);

  return (
    <View className="flex flex-col bg-[#FFFFFF] w-full h-full py-4 justify-between">
      <View>
        <View className="px-4 space-y-8 gap-3">
          <TouchableOpacity
            onPress={handleOnBack}
            className="bg-neutral-100 w-9 h-9 rounded-2xl justify-center items-center p-6">
            <BackArrow />
          </TouchableOpacity>

          <View className="flex flex-col w-fit h-fit gap-2">
            <Text className="text-neutral-800 font-bold text-lg">
              Hi, Welcome Back!
            </Text>

            <Text className="text-neutral-500">
              Please fill in your account information
            </Text>
          </View>
        </View>

        <View className="flex flex-col space-y-4 mt-8 w-full px-5">
          <View className="flex flex-col gap-4">
            <View className="flex flex-col gap-[2px] rounded-md bg-[#FFFFFF]">
              <Text className="text-neutral-800 text-xs font-bold">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#64748B"
                placeholder="email@address.com"
                className="bg-neutral-100 px-2 rounded-md"
              />
            </View>
            <View className="flex flex-col gap-[2px] rounded-md">
              <Text className="text-neutral-800 text-xs font-bold">
                Password
              </Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#64748B"
                placeholder="Enter Your Password"
                className="bg-neutral-100 px-2 rounded-md"
              />
            </View>
          </View>
        </View>
      </View>

      <View className="flex w-full px-4">
        <TouchableOpacity
          onPress={() =>
            loginHandler().catch(e =>
              ToastAndroid.showWithGravityAndOffset(
                'Wrong Credential or User Not Found',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50,
              ),
            )
          }
          className="bg-primary-500 w-full py-3 rounded-2xl shadow-md shadow-black">
          <Text className="text-center font-bold text-lg text-[#FFFFFF]">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

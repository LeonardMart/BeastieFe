import React, {FC, useEffect} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHttpRequest} from '../../hooks/useHttpRequest';
import {saveUserInfo} from '../../store/pet-owner/action';
import {RootState} from '../../store/store';
import { saveUserOrderInfo } from '../../store/pet-owner/order/orderAction';

interface login {
  navigation: any;
}

const SplashScreen: FC<login> = ({navigation}) => {
  const userInfo = useSelector((state: RootState) => state.user?.userInfo);
  const Baseurl = `http://10.0.2.2:4000/authlogin`;
  const {sendRequest} = useHttpRequest(Baseurl);
  const Base = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest: getRequest} = useHttpRequest(Base);
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionValidation = async () => {
      const isLogin = await AsyncStorage.getItem('session');
      if (isLogin) {
        const {email, password} = JSON.parse(isLogin);
        if (email && password) {
          const res = await sendRequest({
            url: `/login/${email}/${password}`,
            method: 'get',
          });
          if (res.status == 1) {
            dispatch(saveUserInfo(res.data[0]));
            navigation.navigate('navigateToHome');
          }
        }
      }else{
        setTimeout(()=>{
            navigation.navigate('navigateToMain')
        }, 1000)
      }
    };
    void sessionValidation();
  }, []);

  const getOrderList = async () => {
    const res = await getRequest({
      url: `/retrieveOwnerOrder/${userInfo?.userid}`,
      method: 'get',
    });
    if (res.status == 1) {
      console.log("res data", res.data)
      dispatch(saveUserOrderInfo(res.data))
    }
  };
  useEffect(() => {
    getOrderList().catch(e => console.log('error retrieve order history', e));
  }, [userInfo]);

  const handleLogin = () => {
    navigation.navigate('navigateToLogin');
  };
  const handleRegist = () => {
    navigation.navigate('navigateToRegister');
  };

  console.log('anjay', userInfo);

  return (
    <View className="h-full py-4 w-full items-center justify-center bg-primary-500">
      <Image source={require('../../logo/splash.png')} />
    </View>
  );
};
export default SplashScreen;

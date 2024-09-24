import {FC, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../icon/back-arrow/back-arrow';
import ProfileIcon from '../../icon/profile-icon/profile-icon';
import {RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import NextArrow from '../../icon/next-arrow/next-arrow';
import LocationIcon from '../../icon/location-icon/location';
import LoveIcon from '../../icon/love/love-icon';
import LogoutIcon from '../../icon/logout-icon/logout-icon';
import {resetState} from '../../store/pet-owner/action';
import {savePetCareInfo} from '../../store/pet-care/action';
import OngoingOrderIcon from '../../icon/order-icon/ongoing-icon';
import NewBookingIcon from '../../icon/order-icon/new-booking-icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILogin {
  navigation: any;
}

const Profile: FC<ILogin> = ({navigation}) => {
  // const pfInfo = useSelector((state: State) => state.petCare.petCareInfo);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const pfUrl = `http://10.0.2.2:4000/authretrievepf/retrieve`;

  const sessionValidation = async () => {};

  const backHandler = () => {
    navigation.navigate('navigateToHome');
  };
  const logoutHandler = async () => {
    await AsyncStorage.clear();
    navigation.navigate('navigateToMain');
    dispatch(resetState());
  };

  const myPetsHandler = () => {
    navigation.navigate('navigateToPet');
  };
  const myAddresssHandler = () => {
    navigation.navigate('navigateToAddress', {pageFrom: 'Profile'});
  };

  const bePfsHandler = () => {
    navigation.navigate('navigateToBePf');
  };

  const PfHandler = () => {
    retrievePfInfo();
  };

  const retrievePfInfo = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(`${pfUrl}/${userInfo?.userid}`, {
        signal: abortController.signal,
      });
      if (res.status == 200) {
        const result = res.data.data[0];
        console.log('asas', result);
        dispatch(savePetCareInfo(result));
        navigation.navigate('navigateToPfProfile');
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
  };

  const pfSelector = () => {
    if (userInfo?.pf_flag == false) {
      return (
        <View className="px-4 pt-3">
          <View className="border-[1px] border-neutral-200 rounded-2xl">
            <View className="px-3 py-3 flex flex-row items-center space-x-6 ">
              <View className="w-[290px] flex flex-col space-y-1">
                <Text className="font-semibold text-xs text-neutral-800">
                  Be a Pet Friend
                </Text>
                <Text className="text-xs text-neutral-500">
                  Setup your Pet Friend Account and take care of others pets.
                </Text>
              </View>
              <TouchableOpacity
                onPress={bePfsHandler}
                className="bg-neutral-100 w-9 h-9 rounded-xl justify-center items-center">
                <NextArrow color="neutral-800" width={12} height={12} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (userInfo?.pf_flag == true) {
      return (
        <View className="px-4 pt-3">
          <View className="border-[1px] border-neutral-200 rounded-2xl">
            <View className="px-3 py-3 flex flex-row items-center space-x-6 justify-center">
              <View className="w-[290px] flex flex-col space-y-2.5">
                <Text className="font-semibold text-xs text-neutral-500">
                  Pet Friend Account
                </Text>
                <View className="flex flex-row space-x-3">
                  <View className="flex flex-col bg-yellow-50 rounded-xl p-2.5 w-[140px] space-y-1.5">
                    <OngoingOrderIcon
                      color="yellow-500"
                      width={20}
                      height={20}
                    />
                    <Text className="text-xs text-neutral-800">
                      1 ongoing booking
                    </Text>
                  </View>
                  <View className="flex flex-col bg-primary-50 rounded-xl p-2.5 w-[140px] space-y-1.5">
                    <NewBookingIcon
                      color="primary-500"
                      width={20}
                      height={20}
                    />
                    <Text className="text-xs text-neutral-800">
                      1 new booking
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={PfHandler}
                className="bg-neutral-100 w-9 h-9 rounded-xl justify-center items-center">
                <NextArrow color="neutral-800" width={12} height={12} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <View className="bg-primary-500 h-full">
      <View className="pt-4 pb-6 px-4">
        <TouchableOpacity
          onPress={backHandler}
          className="bg-neutral-100 w-9 h-9 rounded-2xl justify-center items-center p-6">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
      </View>

      <View className="z-30 flex h-full bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 pt-4">
        <View className="flex flex-row w-full space-y-3 px-4 items-center space-x-3">
          <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
            <ProfileIcon height={50} width={50} />
          </View>
          <View className="h-[70px] space-y-1">
            <Text className="font-bold text-sm text-neutral-800">
              {userInfo?.username}
            </Text>
            <Text className="text-xs text-neutral-500">{userInfo?.email}</Text>
            <Text className="text-xs text-neutral-500">
              +62{userInfo?.phone}
            </Text>
          </View>
        </View>

        {pfSelector()}

        <View className="px-4 pt-4">
          <Text className="text-primary-500 font-semibold text-xs">
            Account Setting
          </Text>
          <TouchableOpacity
            onPress={myPetsHandler}
            className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <LoveIcon color="neutral-800" width={18} height={20} />
              <Text className="text-neutral-800 font-semibold text-sm">
                My Pets
              </Text>
            </View>

            <View className="flex flex-row space-x-1.5 items-center">
              <View className="bg-neutral-100 px-1.5 rounded-lg py-1.5">
                <Text className="text-neutral-500 text-[10px] font-semibold">
                  {userInfo?.pets ? userInfo?.pets.length : '0'} pets
                </Text>
              </View>

              <TouchableOpacity className="p-1.5">
                <NextArrow color="neutral-500" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={myAddresssHandler}
            className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <LocationIcon color="neutral-800" w={18} h={20} />
              <Text className="text-neutral-800 font-semibold text-sm">
                My Address
              </Text>
            </View>

            <TouchableOpacity className="p-1.5">
              <NextArrow color="neutral-500" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View className="px-4 pt-4">
          <Text className="text-primary-500 font-semibold text-xs">Other</Text>
          <TouchableOpacity
            onPress={logoutHandler}
            className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <LogoutIcon color="red-500" />
              <Text className="text-red-500 font-semibold text-sm">Logout</Text>
            </View>

            <TouchableOpacity className="p-1.5">
              <NextArrow color="red-500" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

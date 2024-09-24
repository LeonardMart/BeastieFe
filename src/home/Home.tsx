import React, {FC, useEffect} from 'react';
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import ProfileIcon from '../../icon/profile-icon/profile-icon';
import MyPets from './components/MyPets';
import OngoingCare from './components/OngoingCare';
import {RootState} from '../../store/store';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const dummyPet = [
  {
    name: 'rilley',
    petType: 1,
    breed: 'anjing ganteng',
    gender: 'Male',
  },
  {
    name: 'pussy',
    petType: 2,
    breed: 'kucing jelek',
    gender: 'Male',
  },
];

const dummyOngoingCare = [
  {
    userId: 1,
    name: 'James Randolph',
    pets: [
      {
        petId: 1,
        name: 'rilley',
        petType: 1,
        breed: 'anjing ganteng',
        gender: 'Male',
      },
      {
        petId: 2,
        name: 'pussy',
        petType: 2,
        breed: 'kucing jelek',
        gender: 'Male',
      },
    ],
    startDate: '27 Jan',
    endDate: '28 Jan',
    orderStatus: 'ongoing',
  },
];
const Home: FC = () => {
  const userInfo = useSelector((state: RootState) => state.user?.userInfo);
  
  const navigation = useNavigation();
  const profileHandler = () => {
    navigation.navigate('navigateToProfile' as never);
  };


  useEffect(() => {
    const backAction = () => {
      if (userInfo) {
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const findPFHandler = () => {
    navigation.navigate('navigateToFindPF' as never);
  };

  return (
    <View className="bg-[#FFFFFF] h-full">
      <View className="flex flex-row items-center justify-between px-4 py-[14px]">
        <View className="">
          <Text className="text-xs font-semibold text-neutral-500 h-5">
            Hi,
          </Text>
          <Text className="text-base font-bold text-neutral-800 h-7">
            {userInfo?.username}
          </Text>
        </View>
        <TouchableOpacity
          onPress={profileHandler}
          className="bg-neutral-100 w-9 h-9 items-center rounded-[14px] px-1.5 py-1.5">
          <ProfileIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={findPFHandler} className="items-center w-50">
        <Image source={require('../../logo/find-pf.png')} />
      </TouchableOpacity>

      <View className="pt-6">
        <View className="flex flex-row justify-between px-4 items-center">
          <Text className="font-bold text-neutral-800 text-base h-7 text-center">
            My Pets
          </Text>
          <TouchableOpacity className="w-11 h-5">
            <Text className="font-semibold text-neutral-500 text-xs text-center">
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <MyPets pet={dummyPet} />
      </View>

      <View className="pt-8">
        <View className="flex flex-row justify-between px-4 items-center">
          <Text className="font-bold text-neutral-800 text-base h-7 text-center">
            Ongoing Care
          </Text>
          {/* <TouchableOpacity className="w-11 h-5">
            <Text className="font-semibold text-neutral-500 text-xs text-center">
              View All
            </Text>
          </TouchableOpacity> */}
        </View>
        <OngoingCare ongoingOrder={dummyOngoingCare} />
      </View>
    </View>
  );
};
export default Home;

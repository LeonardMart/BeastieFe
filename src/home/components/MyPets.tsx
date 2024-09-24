import {FC, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import CalenderIcon from '../../../icon/calender/calender';
import OtherTypeIcon from '../../../icon/type/other-icon';
import MaleIcon from '../../../icon/gender-icon/male-icon';
import FemaleIcon from '../../../icon/gender-icon/female-icon';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import NextArrow from '../../../icon/next-arrow/next-arrow';
import {useNavigation} from '@react-navigation/native';

interface petInfo {
  name: string;
  petType: number;
  breed: string;
  gender: string;
}

interface Ipets {
  pet: petInfo[];
}

const MyPets: FC<Ipets> = ({pet}) => {
  const navigation = useNavigation();
  const [dataPet, setDataPet] = useState<petInfo[]>([]);
  const userInfo = useSelector((state: RootState) => state.user?.userInfo);

  const getAge = (date: Date) => {
    const savedDate = new Date(date);
    const currDate = new Date();
    const differenceInMs = currDate.getTime() - savedDate.getTime();
    const monthsDifference = differenceInMs / (1000 * 60 * 60 * 24 * 30);
    const numberOfMonths = Math.floor(monthsDifference);
    return numberOfMonths;
  };

  const addHandler = () => {
    navigation.navigate('navigateToPet' as never);
  };

  useEffect(() => {
    setDataPet(pet);
  }, [pet]);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row px-4 space-x-3 items-center">
        {userInfo?.pets &&userInfo?.pets.length>0 ? (
          userInfo?.pets.map(data => {
            return (
              <View
                key={data.id}
                className="border-[1px] w-64 rounded-2xl border-neutral-200 ">
                <View className="flex flex-row items-center space-x-3 py-[14px] px-3  w-full bg-primary-00 justify-between">
                  <View className="flex flex-row space-x-3">
                    {data.type == 'Dog' && (
                      <View className="w-9 h-9 bg-primary-50 items-center justify-center  rounded-[14px]">
                        <DogTypeIcon />
                      </View>
                    )}
                    {data.type == 'Cat' && (
                      <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
                        <CatTypeIcon />
                      </View>
                    )}
                    {data.type == 'Other' && (
                      <View className="w-9 h-9 bg-red-50 items-center justify-center  rounded-[14px]">
                        <OtherTypeIcon />
                      </View>
                    )}
                    <View>
                      <Text className="font-semibold text-[10px] text-neutral-500 w-full">
                        {data.breed}
                      </Text>
                      <Text className="font-bold text-sm text-neutral-800">
                        {data.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="border-t-[1px] border-neutral-200 bg-neutral-50 rounded-b-2xl py-3 px-3 flex flex-row justify-between">
                  <View className=" flex flex-row items-center space-x-1.5">
                    <View className="w-7 h-7 bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px]">
                      <CalenderIcon />
                    </View>
                    <Text className="text-xs font-semibold text-neutral-500">
                      {getAge(new Date(data.dob))} mo years old
                    </Text>
                  </View>

                  <View className="w-20 flex flex-row items-center space-x-1.5">
                    <View className="w-7 h-7 bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px]">
                      {data.gender == 'Male' ? <MaleIcon /> : <FemaleIcon />}
                    </View>
                    <Text className="text-xs font-semibold text-neutral-500">
                      {data.gender}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View className=" pt-3">
            <View className="border-[1px] border-neutral-200 rounded-2xl">
              <View className="px-3 py-3 flex flex-row items-center space-x-6 ">
                <View className="w-[290px] flex flex-col space-y-1">
                  <Text className="font-semibold text-xs text-neutral-800">
                    Start adding your pets into your account
                  </Text>
                  <Text className="text-xs text-neutral-500">
                    Add your pet details and start finding pet friends to take
                    care of them.
                  </Text>
                </View>
                <TouchableOpacity onPress={addHandler} className="bg-neutral-100 w-9 h-9 rounded-xl justify-center items-center">
                  <NextArrow color="neutral-800" width={12} height={12} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <TouchableOpacity onPress={addHandler} className="p-1.5 bg-neutral-100 rounded-[14px]">
          <PlusIcon color='neutral-500'/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyPets;

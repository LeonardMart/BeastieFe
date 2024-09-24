import React, {FC, useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PlusIcon from '../../icon/plus-icon/plus-icon';
import DatePicker from '../../component/date-picker/DatePicker';
import DogTypeIcon from '../../icon/type/dog-icon';
import MoreVertical from '../../icon/more-vertical/more-vertical';
import CalenderIcon from '../../icon/calender/calender';
import MaleIcon from '../../icon/gender-icon/male-icon';
import CatTypeIcon from '../../icon/type/cat-icon';
import OtherTypeIcon from '../../icon/type/other-icon';
import FemaleIcon from '../../icon/gender-icon/female-icon';
import DeleteEditSlideModal from './component-pet/DeleteEditSlideModal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import SlideModal from './component-pet/SlideModal';
import BackArrow from '../../icon/back-arrow/back-arrow';
import axios from 'axios';
import {updatePet} from '../../store/pet-owner/action';

const MyPets: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [state, setState] = useState<'Add' | 'Edit'>('Add');
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const petUrl = 'http://10.0.2.2:4000/authpet/';

  const backHanler = () => {
    navigation.navigate('navigateToProfile' as never);
  };

  const getAge = (date: Date) => {
    const savedDate = new Date(date);
    const currDate = new Date();
    const differenceInMs = currDate.getTime() - savedDate.getTime();
    const monthsDifference = differenceInMs / (1000 * 60 * 60 * 24 * 30);
    const numberOfMonths = Math.floor(monthsDifference);
    return numberOfMonths;
  };

  const insertHandler = async (newPet: any) => {
    const body = {
      newPet,
    };
    console.log(body, 'cek njing');
    try {
      const res = await axios.post(`${petUrl}/insert`, body);
      if (res.status == 200) {
        console.log('insert success');
        await retrievePet();
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const retrievePet = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(`${petUrl}/retrieve/${userInfo?.userid}`, {
        signal: abortController.signal,
      });

      if (res.status == 200) {
        dispatch(updatePet(res.data.data));
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
    console.log('cek', userInfo?.pets);
  };

  const removePet = async (petId: number) => {
    try {
      const res = await axios.delete(
        `${petUrl}/remove/${petId}/${userInfo?.userid}`,
      );
      if (res.status == 200) {
        console.log('delete success');
        await retrievePet();
      } else {
        throw new Error('Failed to delete pet');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  console.log('cek12', userInfo);
  return (
    <View className="bg-[#FFFFFF] h-full">
      <ScrollView>
        <View className="flex flex-col justify-between h-full">
          <View className="flex flex-row w-full border-b-[1px] border-neutral-200 py-4 px-4 items-center space-x-3">
            <TouchableOpacity
              onPress={backHanler}
              className="items-center w-6 h-6 justify-center">
              <BackArrow color="neutral-800" width={16} height={16} />
            </TouchableOpacity>

            <Text className="font-semibold text-neutral-800 text-base">
              My Pets
            </Text>
          </View>
          <View className="flex flex-col h-fit w-full py-4 space-y-4 px-3">
            {userInfo?.pets &&
              userInfo?.pets.map(data => {
                return (
                  <View
                    key={data.name}
                    className="border-[1px] w-full rounded-2xl border-neutral-200 ">
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
                          <Text className="font-semibold text-xs text-neutral-500 w-full">
                            {data.breed}
                          </Text>
                          <Text className="font-bold text-sm text-neutral-800">
                            {data.name}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          setEditModal(!editModal);
                          setSelectedId(data.id);
                        }}
                        className="w-4 h-9 items-end justify-center">
                        <MoreVertical />
                      </TouchableOpacity>
                    </View>

                    <View className="border-t-[1px] border-neutral-200 bg-neutral-100 rounded-b-2xl py-3 px-3 flex flex-row justify-between">
                      <View className="w-56 flex flex-row items-center space-x-1.5">
                        <View className="w-7 h-7 bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px]">
                          <CalenderIcon />
                        </View>
                        <Text className="text-xs font-semibold text-neutral-500">
                          {getAge(new Date(data.dob))} mo years old
                        </Text>
                      </View>

                      <View className="w-20 flex flex-row items-center space-x-1.5">
                        <View className="w-7 h-7 bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px]">
                          {data.gender == 'Male' ? (
                            <MaleIcon />
                          ) : (
                            <FemaleIcon />
                          )}
                        </View>
                        <Text className="text-xs font-semibold text-neutral-500">
                          {data.gender}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}

            <TouchableOpacity
              onPress={() => {
                setOpenModal(!openModal);
                setState('Add');
              }}
              className="w-full h-fit flex flex-row space-x-3 items-center">
              <View className="w-9 h-9 bg-neutral-100 rounded-[14px] items-center justify-center">
                <PlusIcon color="neutral-500" />
              </View>
              <Text className="font-bold text-sm text-neutral-500">
                Add Pet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <SlideModal
        state={state}
        petId={selectedId}
        visible={openModal}
        onClose={a => setOpenModal(a)}
        onAdd={insertHandler}
      />
      <DeleteEditSlideModal
        visible={editModal}
        onEdit={a => {
          setState(a), setOpenModal(true);
        }}
        onClose={() => setEditModal(!editModal)}
        onRemove={() => removePet(selectedId)}

      />
    </View>
  );
};

export default MyPets;

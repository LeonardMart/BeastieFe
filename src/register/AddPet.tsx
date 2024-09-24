import React, {FC, useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PlusIcon from '../../icon/plus-icon/plus-icon';
import SlideModal from './component/SlideModal';
import DatePicker from '../../component/date-picker/DatePicker';
import {RegisterContext} from './RegisterMain';
import DogTypeIcon from '../../icon/type/dog-icon';
import MoreVertical from '../../icon/more-vertical/more-vertical';
import CalenderIcon from '../../icon/calender/calender';
import MaleIcon from '../../icon/gender-icon/male-icon';
import CatTypeIcon from '../../icon/type/cat-icon';
import OtherTypeIcon from '../../icon/type/other-icon';
import FemaleIcon from '../../icon/gender-icon/female-icon';
import DeleteEditSlideModal from './component/DeleteEditSlideModal';
import {useNavigation} from '@react-navigation/native';
import ModalDialog from '../../component/modal-dialog/ModalDialog';
import * as yup from 'yup';

interface IPet {
  onFinish: () => void;
}

interface PetInfo {
  tempId: string;
  name: string;
  petType: number;
  gender: string;
  dob: Date;
  breed: string;
}

const petSchema = yup.array().of(
  yup.object().shape({
    name: yup.string().required(),
    petType: yup.string().required(),
    breed: yup.string().required(),
    gender: yup.string().required(),
    dob: yup.date().required()
  })
);
const AddPet: FC<IPet> = ({onFinish}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [petId, setPetId] = useState<string>('');
  const [state, setState] = useState<'Add' | 'Edit'>('Add');
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const registerContext = useContext(RegisterContext);
  const navigation = useNavigation();

  const handleAddPet = (newPet: PetInfo) => {
    const newPetWithId = {...newPet, tempId: Date.now().toString()};
    if (state === 'Edit') {
      const petIndex = registerContext?.pets.findIndex(
        pet => pet.tempId === petId,
      );
      if (petIndex !== undefined && petIndex !== -1 && registerContext) {
        const updatedPets = [...registerContext.pets];
        updatedPets[petIndex] = {...updatedPets[petIndex], ...newPetWithId};
        registerContext?.setPets(updatedPets);
        setEditModal(false);
      }
    } else if (state === 'Add') {
      registerContext?.setPets([...registerContext.pets, newPetWithId]);
    }
    setOpenModal(false);
  };

  useEffect(() => {
    console.log('dapat?', registerContext?.pets);
  }, [registerContext?.pets]);

  const getAge = (date: Date) => {
    const savedDate = new Date(date);
    const currDate = new Date();
    const differenceInMs = currDate.getTime() - savedDate.getTime();

    // Convert milliseconds to months
    const monthsDifference = differenceInMs / (1000 * 60 * 60 * 24 * 30);

    // Round down to get the number of full months
    const numberOfMonths = Math.floor(monthsDifference);
    return numberOfMonths;
  };

  useEffect(() => {
    const validate = async () => {
      const isValid = await petSchema.isValid(registerContext?.pets);
      setIsValidForm(isValid);
    };
    void validate();
  }, [registerContext?.pets]);

  useEffect(() => {
    console.log('tes', registerContext?.pets);
  }, [registerContext?.pets]);

  return (
    <View className="bg-[#FFFFFF] h-full">
      <ScrollView>
        <View className="flex flex-col justify-between h-full px-3">
          <View className="flex flex-col h-fit w-full py-4 space-y-4">
            <View className="w-full flex flex-col space-y-2">
              <Text className="font-bold text-lg text-neutral-800">
                Add Your Pets
              </Text>
              <Text className="font-normal text-base text-neutral-500">
                Personalised your account by adding your pets.
              </Text>
            </View>

            {registerContext?.pets.map(data => {
              return (
                <View
                  key={data.tempId}
                  className="border-[1px] w-full rounded-2xl border-neutral-200 ">
                  <View className="flex flex-row items-center space-x-3 py-[14px] px-3  w-full bg-primary-00 justify-between">
                    <View className="flex flex-row space-x-3">
                      {data.petType == 1 && (
                        <View className="w-9 h-9 bg-primary-50 items-center justify-center  rounded-[14px]">
                          <DogTypeIcon />
                        </View>
                      )}
                      {data.petType == 2 && (
                        <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
                          <CatTypeIcon />
                        </View>
                      )}
                      {data.petType == 3 && (
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
                        setEditModal(!editModal), setPetId(data.tempId);
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
                        {getAge(data.dob)} mo years old
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
            })}

            <TouchableOpacity
              onPress={() => {
                setOpenModal(!openModal), setState('Add');
              }}
              className="w-full h-fit flex flex-row space-x-3 items-center">
              <View className="w-9 h-9 bg-neutral-100 rounded-[14px] items-center justify-center">
                <PlusIcon />
              </View>
              <Text className="font-semibold text-lg text-neutral-500">
                Add Pet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="w-full flex flex-col px-4 mb-4 space-y-4">
        {registerContext?.pets && registerContext?.pets.length>0 ? (
          <TouchableOpacity
            onPress={onFinish}
            className="bg-primary-500 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF]">Finish</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            className="bg-neutral-300 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF]">Finish</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className="justify-center items-center">
          <Text className="text-neutral-800 font-semibold text-sm">
            Skip For Now
          </Text>
        </TouchableOpacity>
      </View>
      <SlideModal
        visible={openModal}
        onClose={a => setOpenModal(a)}
        onAdd={handleAddPet}
        state={state}
        petId={petId}
      />
      <DeleteEditSlideModal
        onEdit={a => {
          setState(a), setOpenModal(true);
        }}
        visible={editModal}
        onClose={() => setEditModal(!editModal)}
        petId={petId}
      />
    </View>
  );
};

export default AddPet;

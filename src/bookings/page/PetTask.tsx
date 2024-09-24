import React, {FC, useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import SelectTaskServiceSlideModal from '../component/SelectTaskServiceSlideModal';
import {BookingContext} from '../Bookings';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import WarningIcon from '../../../icon/round-warning/warning-icon';
import SelectPetSlideModal from '../component/SelectPetSlideModal';

interface IService {
  task_id: number;
  service_name: string;
  price: string;
  count: number;
}

interface IBookings {
  nextPage: () => void;
  backPage: () => void;
  pfId: string;
  acceptedPet: acceptedPet
}

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  dob: string;
}

interface acceptedPet {
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

const PetTask: FC<IBookings> = ({nextPage, backPage, pfId, acceptedPet}) => {
  const bookingContext = useContext(BookingContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [petModal, setPetModal] = useState<boolean>(false);
  const [petId, setPetId] = useState<number>(0);
  const [petType, setPetType] = useState<string>('');
  const [selectedPet, setSelectedPet] = useState<Pet[]>([]);
  const [service, setService] = useState<IService[]>([]);
  // const [acceptedPet, setAcceptedPet] = useState<acceptedPet>({
  //   accept_dog: false,
  //   accept_cat: false,
  //   accept_other: false,
  // });
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    const newPets = bookingContext?.booking.pets
      .flatMap(item => userInfo?.pets.filter(data => data.id === item.id))
      .filter((pet): pet is Pet => pet !== undefined);
    if (newPets) {
      setSelectedPet(newPets);
    }
  }, [bookingContext?.booking.pets]);

  const getAge = (date: Date) => {
    const savedDate = new Date(date);
    const currDate = new Date();
    const differenceInMs = currDate.getTime() - savedDate.getTime();
    const monthsDifference = differenceInMs / (1000 * 60 * 60 * 24 * 30);
    const numberOfMonths = Math.floor(monthsDifference);
    return numberOfMonths;
  };

  const taskAssigned = (petId: number) => {
    const pet = bookingContext?.booking.pets.find(item => item.id === petId);
    const service = pet?.service.filter(
      item => item.count != 0 || item.count > 0,
    );
    return service ? service.length : 0;
  };

  const handleAddServices = (updatedServices: IService[]) => {
    if (bookingContext) {
      const formattedServices = updatedServices.map(service => ({
        task_id: service.task_id,
        service_name: service.service_name,
        price: service.price,
        count: service.count,
      }));

      const updatedPets = bookingContext.booking.pets.map(pet =>
        pet.id === petId
          ? {
              ...pet,
              service: formattedServices,
            }
          : pet,
      );

      bookingContext.setBooking(prevBooking => ({
        ...prevBooking,
        pets: updatedPets,
      }));
    }
    setService(updatedServices); // Adding back setService
    setOpenModal(false);
  };

  useEffect(() => {
    console.log('task', service, bookingContext?.booking.pets);
  }, [service]);

  return (
    <>
      <View className="flex flex-row w-full border-b-[1px] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          onPress={backPage}
          className="items-center w-6 h-6 justify-center">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
        <Text className="font-semibold text-neutral-800 text-base">
          Complete Your Booking
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-col justify-between h-full">
          <View className="flex flex-col h-fit w-full py-4 space-y-4 px-3">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-col">
                <Text className="text-neutral-800 font-bold text-sm">
                  Pet & Tasks
                </Text>
                <Text className="text-[10px] font-semibold text-neutral-500">
                  {selectedPet.length} pets selected
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setPetModal(!petModal)}
                className="px-3 py-1.5 bg-primary-50 rounded-xl">
                <Text className="text-xs font-semibold text-primary-500">
                  Select
                </Text>
              </TouchableOpacity>
            </View>
            {selectedPet.map(data => (
              <View
                key={data.id}
                className="border-[1px] w-full rounded-2xl border-neutral-200 ">
                <View className="flex flex-row items-center space-x-3 py-[14px] px-3  w-full bg-primary-00 justify-between">
                  <View className="flex flex-row space-x-3">
                    {data.type === 'Dog' && (
                      <View className="w-9 h-9 bg-primary-50 items-center justify-center  rounded-[14px]">
                        <DogTypeIcon />
                      </View>
                    )}
                    {data.type === 'Cat' && (
                      <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
                        <CatTypeIcon />
                      </View>
                    )}
                    {data.type === 'Other' && (
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
                </View>
                <View className="border-t-[1px] border-neutral-200 bg-[#FFFFFF] rounded-b-2xl py-3 px-3 flex flex-row">
                  <View className="flex flex-col space-y-1.5 w-full">
                    <Text className="text-[10px] font-semibold text-neutral-500">
                      {taskAssigned(data.id)} task assigned
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpenModal(true);
                        setPetType(data.type);
                        setPetId(data.id);
                      }}>
                      <View className="flex flex-col space-y-1">
                        {bookingContext?.booking.pets.map(
                          pet =>
                            pet.id == data.id &&
                            pet.service.map(item => {
                              return (
                                <View
                                  key={item.task_id}
                                  className="flex flex-row items-center justify-between">
                                  <View className="flex flex-row space-x-2 items-center">
                                    <View className="bg-yellow-500 w-4 h-4 rounded-md items-center justify-center">
                                      <WarningIcon />
                                    </View>
                                    <Text className="font-semibold text-xs text-neutral-800">
                                      {item.service_name}
                                    </Text>
                                  </View>
                                  <Text className="text-neutral-500 text-xs">
                                    {item.count} time
                                  </Text>
                                </View>
                              );
                            }),
                        )}
                      </View>
                    </TouchableOpacity>
                    {bookingContext?.booking.pets.map(
                      pet =>
                        pet.id == data.id &&
                        pet.service.length == 0 && (
                          <TouchableOpacity
                            key={pet.id}
                            onPress={() => {
                              setOpenModal(true);
                              setPetType(data.type);
                              setPetId(data.id);
                            }}
                            className="w-full h-fit flex flex-row space-x-3 items-center">
                            <View className="w-5 h-5 bg-neutral-100 rounded-lg items-center justify-center">
                              <PlusIcon width={12} height={12} />
                            </View>
                            <Text className="font-bold text-sm text-neutral-500">
                              Add Task
                            </Text>
                          </TouchableOpacity>
                        ),
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="w-full flex flex-col absolute bottom-0 pb-10 px-4">
        <TouchableOpacity
          onPress={nextPage}
          className="w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center bg-primary-500">
          <Text className="text-[#FFFFFF] text-base font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <SelectTaskServiceSlideModal
        pfId={pfId}
        petId={petId}
        petType={petType}
        onAdd={handleAddServices}
        onClose={() => setOpenModal(!openModal)}
        visible={openModal}
      />
      <SelectPetSlideModal
        visible={petModal}
        onClose={() => setPetModal(!petModal)}
        onAdd={() => {}}
        acceptedPet={acceptedPet}
      />
    </>
  );
};

export default PetTask;

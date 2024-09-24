import { FC, useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SlideModal from '../../../component/slide-modal/SlideModal';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { BookingContext } from '../Bookings';
import UncheckIcon from '../../../icon/uncheck-icon/uncheck-icon';
import CheckIcon from '../../../icon/check-icon/check-icon';

interface acceptedPet {
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

interface ISlideModal {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  acceptedPet: acceptedPet; // Accept the acceptedPet interface as a prop
}

const MAX_SELECTED_PETS = 2;

const SelectPetSlideModal: FC<ISlideModal> = ({ visible, onClose, onAdd, acceptedPet }) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const bookingContext = useContext(BookingContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  useEffect(() => {
    if (bookingContext?.booking.pets) {
      setSelectedPets(bookingContext.booking.pets.map(pet => pet.id));
    }
  }, [bookingContext?.booking.pets]);

  // Filter pets based on accepted types
  const filteredPets = userInfo?.pets.filter(pet => {
    if (pet.type === 'Dog') {
      return acceptedPet.accept_dog;
    } else if (pet.type === 'Cat') {
      return acceptedPet.accept_cat;
    } else {
      return acceptedPet.accept_other;
    }
  });

  const showSelectedPet = (type: string) => {
    if (type === 'Dog') {
      return (
        <View className="w-[36px] h-[36px] bg-primary-50 items-center justify-center rounded-lg">
          <DogTypeIcon width={20} height={20} />
        </View>
      );
    }
    if (type === 'Cat') {
      return (
        <View className="w-[36px] h-[36px] bg-yellow-50 items-center justify-center rounded-lg">
          <CatTypeIcon width={20} height={20} />
        </View>
      );
    }
    return (
      <View className="w-[36px] h-[36px] bg-red-50 items-center justify-center rounded-lg">
        <OtherTypeIcon width={20} height={20} />
      </View>
    );
  };

  const selectPetHandler = (petId: number) => {
    setSelectedPets(prevSelectedPets => {
      if (prevSelectedPets.includes(petId)) {
        return prevSelectedPets.filter(id => id !== petId);
      } else if (prevSelectedPets.length < MAX_SELECTED_PETS) {
        return [...prevSelectedPets, petId];
      } else {
        return prevSelectedPets; // limit reached, do not add more
      }
    });
  };


  const saveSelectedPets = () => {
    if (!bookingContext) return;

    const existingPets = bookingContext.booking.pets || [];
    const existingPetIds = existingPets.map(pet => pet.id);

    const newSelectedPets = selectedPets.filter(petId => !existingPetIds.includes(petId));
    const remainingPets = existingPets.filter(pet => selectedPets.includes(pet.id));

    const selectedPetInfos = [
      ...remainingPets,
      ...newSelectedPets.map(petId => ({ id: petId, service: [] }))
    ];

    bookingContext.setBooking({
      ...bookingContext.booking,
      pets: selectedPetInfos,
    });

    onClose();
    onAdd();
  };

  useEffect(() => {
    const isValidForm = selectedPets.length > 0;
    setIsValid(isValidForm);
  }, [selectedPets]);

  useEffect(() => {

  }, [bookingContext?.booking.pets]);

  return (
    <SlideModal
      title="Select Pet"
      visible={showModal}
      onClose={onClose}
      height="h-[50%]"
    >
      <View className="flex flex-col space-y-6 px-4 items-center w-full h-full bg-[#FFFFFF]">
        <ScrollView className="w-full flex flex-col">
          {/* Render filtered pets only */}
          {filteredPets?.map(data => (
            <View
              className="flex flex-col border-b-[1px] border-neutral-100 py-3"
              key={data.id}
            >
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row space-x-3">
                  {showSelectedPet(data.type)}
                  <View className="flex flex-col">
                    <Text className="font-semibold text-[10px] text-neutral-500">
                      {data.breed}
                    </Text>
                    <Text className="text-sm font-bold text-neutral-800">
                      {data.name}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => selectPetHandler(data.id)}
                >
                  <View>{selectedPets.includes(data.id) ? <CheckIcon /> : <UncheckIcon />}</View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          disabled={!isValid}
          className={`${isValid ? 'bg-primary-500' : 'bg-neutral-200'} py-3 rounded-2xl shadow-md shadow-black w-full absolute bottom-20`}
          onPress={saveSelectedPets}
        >
          <Text className="text-center font-bold text-lg text-[#FFFFFF]">
            Select
          </Text>
        </TouchableOpacity>
      </View>
    </SlideModal>
  );
};

export default SelectPetSlideModal;

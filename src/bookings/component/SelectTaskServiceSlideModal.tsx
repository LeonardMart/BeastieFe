import {FC, useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import SlideModalIconTitle from './SlideModalIconTitle';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {BookingContext} from '../Bookings';
import {useHttpRequest} from '../../../hooks/useHttpRequest';

interface ISlideModal {
  visible: boolean;
  pfId: string;
  petId: number;
  petType: string;
  onClose: () => void;
  onAdd: (updatedServices: IService[]) => void; // Updated type
}

interface IService {
  task_id: number;
  service_name: string;
  price: string;
  count: number;
}

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  dob: string;
}

const SelectTaskServiceSlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  onAdd,
  pfId,
  petType,
  petId,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const bookingContext = useContext(BookingContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet | undefined>(undefined);
  const [taskService, setTaskService] = useState<IService[]>([]);
  const [selectedTaskService, setSelectedTaskService] = useState<IService[]>(
    [],
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);

  const getTaskService = async () => {
    const res = await sendRequest({
      url: `retrieveTaskService/${pfId}/${petType}`,
      method: 'get',
    });
    if (res.status == 1) {
      const servicesWithCount = res.data.map((service: IService) => {
        // Check if the service already exists in the context
        const existingService = bookingContext?.booking.pets
          .find(pet => pet.id === petId)
          ?.service.find(s => s.task_id === service.task_id);
        return {
          ...service,
          count: existingService ? existingService.count : 0,
        };
      });
      setTaskService(servicesWithCount);
    }
  };

  useEffect(() => {
    getTaskService().catch(e => console.log("can't retrieve service: ", e));
  }, [visible, pfId, petType]);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  useEffect(() => {
    if (petId !== 0) {
      const newData = userInfo?.pets.find(item => item.id === petId);
      setSelectedPet(newData);
    }
  }, [petId, visible]);

  const handleAddTask = (task_id: number) => {
    setTaskService(prevServices =>
      prevServices.map(service =>
        service.task_id === task_id
          ? {...service, count: service.count + 1}
          : service,
      ),
    );
  };

  const handleRemoveTask = (task_id: number) => {
    setTaskService(prevServices =>
      prevServices.map(service =>
        service.task_id === task_id && service.count > 0
          ? {...service, count: service.count - 1}
          : service,
      ),
    );
  };

  useEffect(() => {
    const valid = taskService.some(service => service.count > 0);
    setIsValid(valid);
  }, [taskService]);

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAddServices = () => {
    const updatedServices = taskService.filter(service => service.count > 0);
    onAdd(updatedServices);
  };

  return (
    <SlideModalIconTitle
      title={selectedPet?.name}
      iconSelect={selectedPet?.type}
      visible={showModal}
      onClose={onClose}
      height="h-[50%]">
      <View className="flex flex-col space-y-6 px-4 items-center w-full h-full bg-[#FFFFFF]">
        <ScrollView className="w-full flex flex-col">
          {taskService.map(data => (
            <View
              className="flex flex-col border-b-[1px] border-neutral-100 py-3"
              key={data.task_id}>
              <View className="flex flex-row space-x-3 items-center justify-between">
                <View className="flex flex-col">
                  <Text className="text-sm font-bold text-neutral-800">
                    {data.service_name}
                  </Text>
                  <Text className="font-semibold text-[10px] text-primary-500">
                    IDR {formatPrice(data.price)}
                  </Text>
                </View>
                <View className="flex flex-row items-center space-x-2">
                  <TouchableOpacity
                    onPress={() => handleRemoveTask(data.task_id)}
                    className="rounded-full w-6 h-6 bg-[#FFFFFF] border-primary-500 border-[1px] p-1 items-center justify-center">
                    <View className="h-[1px] w-2.5 bg-primary-500"></View>
                  </TouchableOpacity>
                  <Text className="text-base font-semibold text-neutral-400">
                    {data.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleAddTask(data.task_id)}
                    className="rounded-full w-6 h-6 bg-primary-500 border-primary-500 border-[1px] p-1 items-center justify-center">
                    <PlusIcon color="white" height={12} width={12} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          disabled={!isValid}
          className={` ${
            isValid ? 'bg-primary-500' : 'bg-neutral-200'
          } py-3 rounded-2xl shadow-md shadow-black w-full absolute bottom-20`}
          onPress={handleAddServices}>
          <Text className="text-center font-bold text-lg text-[#FFFFFF]">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </SlideModalIconTitle>
  );
};

export default SelectTaskServiceSlideModal;

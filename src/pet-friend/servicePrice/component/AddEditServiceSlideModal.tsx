import {FC, useContext, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import SlideModal from '../../../../component/slide-modal/SlideModal';

import DogTypeIcon from '../../../../icon/type/dog-icon';
import CatTypeIcon from '../../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../../icon/type/other-icon';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';

interface ISlideModal {
  visible: boolean;
  state: 'Add' | 'Edit';
  data?: Service;
  onClose: () => void;
  onAdd: (a: Service) => void;
}

const type = [
  {
    id: 1,
    type: 'Dog',
  },
  {
    id: 2,
    type: 'Cat',
  },
  {
    id: 3,
    type: 'Other',
  },
];

interface Service {
  id: number;
  service_name: string;
  price: string;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

const AddEditServiceSlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  onAdd,
  state,
  data,
}) => {
  // const registerPfContext = useContext(RegisterPFContext);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [priceDec, setPriceDec] = useState<string>('');
  const [additionalTask, setAdditionalTasks] = useState<Service>({
    id: 0,
    service_name: '',
    price: '',
    accept_dog: false,
    accept_cat: false,
    accept_other: false,
  });

  useEffect(() => {
    if (state == 'Edit' && data) {
      setAdditionalTasks(data);
    }
  }, [visible, state]);

  const selectHandler = (id: number) => {
    if (id == 1) {
      setAdditionalTasks({
        ...additionalTask,
        accept_dog: !additionalTask.accept_dog,
      });
    } else if (id == 2) {
      setAdditionalTasks({
        ...additionalTask,
        accept_cat: !additionalTask.accept_cat,
      });
    } else if (id == 3) {
      setAdditionalTasks({
        ...additionalTask,
        accept_other: !additionalTask.accept_other,
      });
    }
  };

  const onSelect = (id: number, part: string) => {
    let focused = '';
    if (
      (id == 1 && additionalTask.accept_dog == true) ||
      (id == 2 && additionalTask.accept_cat == true) ||
      (id == 3 && additionalTask.accept_other == true)
    ) {
      if (part == 'border') {
        focused = 'border-[1px] border-primary-500 bg-[#FFFFFF]';
      } else if (part == 'background') {
        if (id == 1) {
          focused = 'bg-primary-50';
        } else if (id == 2) {
          focused = 'bg-yellow-50';
        } else if (id == 3) {
          focused = 'bg-red-50';
        }
      }
    } else if (part == 'background') {
      focused = 'bg-neutral-200';
    }
    return focused;
  };

  const resetState = () => {
    setAdditionalTasks({
      id: 0,
      service_name: '',
      price: '',
      accept_dog: false,
      accept_cat: false,
      accept_other: false,
    });
  };

  const closeHandler = () => {
    resetState();
    onClose();
  };

  const addHandler = () => {
    if (state == 'Edit') {
      onAdd(additionalTask);
    } else if (state == 'Add') {
      const newData = {...additionalTask, id: Date.now()};
      onAdd(newData);
    }
    closeHandler();
  };

  const calculate = () => {
    let selected = Object.values(additionalTask).filter(
      val => val === true,
    ).length;
    return selected;
  };
  useEffect(() => {
    setShowModal(visible);
  }, [visible]);


  // useEffect(() => {
  //   console.log('visible', showModal);
  // }, [showModal]);

  // useEffect(() => {
  //   console.log('accept', additionalTask);
  // }, [additionalTask]);

  useEffect(() => {
    console.log('state', state);
  }, [state,visible]);

  useEffect(()=>{
    if(!visible){
      resetState()
    }
  },[visible])

  const formatPrice = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (formattedValue.endsWith('.')) {
      formattedValue = formattedValue.slice(0, -1);
    }
    return formattedValue;
  };

  return (
    <>
      <SlideModal
        title="Add Task Service"
        visible={showModal}
        onClose={closeHandler}
        height="h-[50%]">
        <View className=" flex flex-col space-y-6 py-5 px-4 items-center w-full h-full">
          <View className="w-full flex flex-col space-y-3 ">
            <View className="flex flex-col gap-[2px] rounded-md bg-[#FFFFFF]">
              <Text className="text-neutral-800 text-xs font-bold">
                Task Service
              </Text>
              <View className="bg-neutral-100 px-2 items-center rounded-md justify-between">
                <TextInput
                  value={additionalTask.service_name}
                  onChangeText={e =>
                    setAdditionalTasks({...additionalTask, service_name: e})
                  }
                  placeholderTextColor="#64748B"
                  placeholder="Enter Task Service"
                  className="w-full text-sm text-neutral-500"
                />
              </View>
            </View>

            <View className="flex flex-col gap-[2px] rounded-md bg-[#FFFFFF]">
              <Text className="text-neutral-800 text-xs font-bold">Price</Text>
              <View className="bg-neutral-100 px-2 flex flex-row items-center rounded-md space-x-2.5">
                <Text>IDR</Text>
                <TextInput
                  keyboardType="numeric"
                  value={formatPrice(additionalTask.price)}
                  onChangeText={a =>
                    setAdditionalTasks({...additionalTask, price: a})
                  }
                  placeholderTextColor="#64748B"
                  placeholder="000"
                  className="w-72 text-sm text-neutral-500"
                />
              </View>
            </View>

            <View className="flex flex-col space-y-1 pt-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-semibold text-xs text-neutral-800 ">
                  Available For
                </Text>
                <Text className="text-primary-500 text-xs ">
                  {calculate()} Selected
                </Text>
              </View>

              <View className="flex flex-row space-x-3">
                {type.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => selectHandler(item.id)}
                      className={`${onSelect(
                        item.id,
                        'border',
                      )}bg-neutral-100 px-2 py-1.5 w-[86px] rounded-[10px] flex flex-row items-center space-x-2.5`}>
                      <View
                        className={`${onSelect(
                          item.id,
                          'background',
                        )}  justify-center items-center p-1.5 rounded-lg`}>
                        {item.id == 1 ? (
                          <DogTypeIcon
                            color={
                              additionalTask.accept_dog != true && 'neutral-500'
                            }
                            width={16}
                            height={16}
                          />
                        ) : item.id == 2 ? (
                          <CatTypeIcon
                            color={
                              additionalTask.accept_cat != true && 'neutral-500'
                            }
                            width={16}
                            height={16}
                          />
                        ) : (
                          <OtherTypeIcon
                            color={
                              additionalTask.accept_other != true &&
                              'neutral-500'
                            }
                            width={16}
                            height={16}
                          />
                        )}
                      </View>
                      <Text className="text-sm text-neutral-500 font-semibold">
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={addHandler}
            className="bg-primary-500 py-3 rounded-2xl shadow-md shadow-black sticky w-full bottom-0">
            <Text className="text-center font-bold text-lg text-[#FFFFFF]">
              {state == 'Add'?'Add':'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      </SlideModal>
    </>
  );
};

export default AddEditServiceSlideModal;

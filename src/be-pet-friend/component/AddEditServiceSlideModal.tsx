import {FC, useContext, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import SlideModal from '../../../component/slide-modal/SlideModal';
import TrashIcon from '../../../icon/trash-icon/trash-icon';
import RedTrashIcon from '../../../icon/trash-icon/red-trash-icon';
import EditIcon from '../../../icon/edit-icon/edit-icon';
import NextArrow from '../../../icon/next-arrow/next-arrow';
import ModalDialog from '../../../component/modal-dialog/ModalDialog';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import {RegisterPFContext} from '../BePetFriend';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

interface ISlideModal {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
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

interface IAdditionaltask {
  userId: string;
  taskService: string;
  price: string;
  acceptDog: boolean;
  acceptCat: boolean;
  acceptOther: boolean;
}

const AddEditServiceSlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const registerPfContext = useContext(RegisterPFContext);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [priceDec, setPriceDec] = useState<string>('');
  const [additionalTask, setAdditionalTasks] = useState<IAdditionaltask>({
    userId: userInfo?.userid ?? '',
    taskService: '',
    price: '',
    acceptDog: false,
    acceptCat: false,
    acceptOther: false,
  });

  const selectHandler = (id: number) => {
    if (id == 1) {
      setAdditionalTasks({
        ...additionalTask,
        acceptDog: !additionalTask.acceptDog,
      });
    } else if (id == 2) {
      setAdditionalTasks({
        ...additionalTask,
        acceptCat: !additionalTask.acceptCat,
      });
    } else if (id == 3) {
      setAdditionalTasks({
        ...additionalTask,
        acceptOther: !additionalTask.acceptOther,
      });
    }
  };

  const onSelect = (id: number, part: string) => {
    let focused = '';
    if (
      (id == 1 && additionalTask.acceptDog == true) ||
      (id == 2 && additionalTask.acceptCat == true) ||
      (id == 3 && additionalTask.acceptOther == true)
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

  const addHandler = () => {
    registerPfContext?.setPriceList({
      ...registerPfContext.priceList,
      additionalTask: [
        ...registerPfContext.priceList.additionalTask,
        additionalTask,
      ],
    });
    setAdditionalTasks({
      userId:userInfo?.userid??'',
      taskService: '',
      price: '',
      acceptDog: false,
      acceptCat: false,
      acceptOther: false,
    });
    setPriceDec('');
    onClose();
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

  useEffect(() => {
    console.log('visible', showModal);
  }, [showModal]);

  useEffect(() => {
    console.log('accept', additionalTask);
  }, [additionalTask]);
  
  // useEffect(() => {
  //   console.log('accept', state);
  // }, [additionalTask]);

  const formatPrice = (value: string, setValueDec?: (val: string) => void) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (formattedValue.endsWith('.')) {
      formattedValue = formattedValue.slice(0, -1);
    }
    if (!setValueDec) {
      return formattedValue;
    } else if (setValueDec) {
      setValueDec(formattedValue);
    }
  };

  useEffect(() => {
    setAdditionalTasks({...additionalTask, price: priceDec.replace(/\./g, '')});
  }, [priceDec]);

  const handlePriceChange = (value: string) => formatPrice(value, setPriceDec);

  return (
    <>
      <SlideModal
        title="Add Task Service"
        visible={showModal}
        onClose={onClose}
        height="h-[50%]">
        <View className=" flex flex-col space-y-6 py-5 px-4 items-center w-full h-full">
          <View className="w-full flex flex-col space-y-3 ">
            <View className="flex flex-col gap-[2px] rounded-md bg-[#FFFFFF]">
              <Text className="text-neutral-800 text-xs font-bold">
                Task Service
              </Text>
              <View className="bg-neutral-100 px-2 items-center rounded-md justify-between">
                <TextInput
                  value={additionalTask.taskService}
                  onChangeText={e =>
                    setAdditionalTasks({...additionalTask, taskService: e})
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
                  value={priceDec}
                  onChangeText={handlePriceChange}
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
                              additionalTask.acceptDog != true && 'neutral-500'
                            }
                            width={16}
                            height={16}
                          />
                        ) : item.id == 2 ? (
                          <CatTypeIcon
                            color={
                              additionalTask.acceptCat != true && 'neutral-500'
                            }
                            width={16}
                            height={16}
                          />
                        ) : (
                          <OtherTypeIcon
                            color={
                              additionalTask.acceptOther != true &&
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
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </SlideModal>
    </>
  );
};

export default AddEditServiceSlideModal;

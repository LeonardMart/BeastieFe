import {FC, useEffect, useMemo, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CloseIcon from '../../../icon/close-icon/close-icon';
import RadioGroup from 'react-native-radio-buttons-group';
import {space} from 'postcss/lib/list';
import DatePicker from '../../../component/date-picker/DatePicker';
import RadioSelect from './RadioSelect';
import BlankRadio from '../../../icon/radio/blank-radio';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import FilledRadio from '../../../icon/radio/filled-radio';

interface IType {
  id: number;
  value: string;
}

interface ISlideModal {
  visible: boolean;
  onClose: (a: boolean) => void;
  onSelect: (a: IType) => void;
  state: 'Add' | 'Edit';
  petType?: IType;
}

const transparent = `rgba(0,0,0,0.5)`;
const PetTypeSlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  onSelect,
  state,
  petType,
}) => {
  const [selected, setSelected] = useState<IType>({
    id: 0,
    value: '',
  });
  const radioButtons = useMemo(
    () => [
      {
        id: 1, // acts as primary key, should be unique and non-empty string
        label: 'Dog',
        value: 'Dog',
      },
      {
        id: 2,
        label: 'Cat',
        value: 'Cat',
      },
      {
        id: 3,
        label: 'Other',
        value: 'Other',
      },
    ],
    [],
  );

  const item = {
    time: Date.now(), // Example value for 'time'
  };

  useEffect(() => {
    if (state == 'Edit' && petType) setSelected(petType);
  }, [visible, petType]);

  // useEffect(() => {
  //   if (state == 'Edit' && typeId) {
  //     setSelectedId(typeId);
  //   }
  // }, [visible]);

  // useEffect(() => {
  //   if (state == 'Edit') {
  //     let valueById = '';
  //     if (selectedId == 1) {
  //       valueById = 'Dog';
  //     } else if (selectedId == 2) {
  //       valueById = 'Cat';
  //     } else if (selectedId == 3) {
  //       valueById = 'Other';
  //     }
  //     setSelected({id: selectedId, value: valueById});
  //   }
  // }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{backgroundColor: transparent}} className="flex h-full">
        <View className="z-30 flex h-[50%] bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 pt-6 absolute">
          <View className="flex flex-row px-4 pb-3 justify-between border-b-[1px] border-neutral-200">
            <Text className="font-semibold text-base text-neutral-800">
              Add Pet
            </Text>
            <TouchableOpacity onPress={() => onClose(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <View className="flex flex-col justify-between h-full px-4 py-2">
            <View className="flex flex-col w-full space-y-3 ">
              {radioButtons.map(data => {
                return (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      setSelected(data);
                    }}
                    className="w-full flex flex-row justify-between px-4 py-4 items-center border-b-[1px] border-neutral-100">
                    <View className="flex flex-row space-x-3 items-center">
                      {data.id == 1 && (
                        <View className="w-9 h-9 bg-primary-50 items-center justify-center  rounded-[14px]">
                          <DogTypeIcon />
                        </View>
                      )}
                      {data.id == 2 && (
                        <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
                          <CatTypeIcon />
                        </View>
                      )}
                      {data.id == 3 && (
                        <View className="w-9 h-9 bg-red-50 items-center justify-center  rounded-[14px]">
                          <OtherTypeIcon />
                        </View>
                      )}
                      <Text className="font-bold text-neutral-800">
                        {data.label}
                      </Text>
                    </View>
                    {selected.id == data.id ? <FilledRadio /> : <BlankRadio />}
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              onPress={() => {
                onClose(false);
                onSelect(selected);
              }}
              className="bg-primary-500 py-3 rounded-2xl shadow-md shadow-black mb-10">
              <Text className="text-center font-bold text-lg text-[#FFFFFF]">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PetTypeSlideModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#EFF6FF',

    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  radio: {
    color: 'red',
  },
});

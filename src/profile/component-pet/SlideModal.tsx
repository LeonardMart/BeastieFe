import {FC, useEffect, useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CloseIcon from '../../../icon/close-icon/close-icon';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from '../../../component/date-picker/DatePicker';
import DropdownIcon from '../../../icon/dropdown-icon/dropdown-icon';
import PetTypeSlideModal from './PetTypeSlideModal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

interface ISlideModal {
  visible: boolean;
  onClose: (a: boolean) => void;
  onAdd: (a: IAddPet) => void;
  state: 'Add' | 'Edit';
  petId?: number;
}

interface IAddPet {
  name: string;
  petType: number;
  breed: string;
  gender: string;
  dob: Date;
  userId: string;
}

interface petType {
  id: number;
  value: string;
}
const petTypes = [
  {label: 'Dog', value: '1'},
  {label: 'Cat', value: '2'},
  {label: 'Other', value: '3'},
];
const transparent = `rgba(0,0,0,0.5)`;
const SlideModal: FC<ISlideModal> = ({
  visible,
  onClose,
  onAdd,
  state,
  petId,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [selectedId, setSelectedId] = useState('');
  const [typeVisible, setTypeVisible] = useState<boolean>(false);
  const [petType, setPetType] = useState<petType>({id: 0, value: ''});
  const [addPet, setAddPet] = useState<IAddPet>({
    name: '',
    petType: petType.id,
    breed: '',
    gender: '',
    dob: new Date(),
    userId: userInfo?.userid ?? '',
  });

  const radioButtons = useMemo(
    () => [
      {
        id: 'Male', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'Male',
      },
      {
        id: 'Female',
        label: 'Female',
        value: 'Male',
      },
    ],
    [],
  );

  const item = {
    time: Date.now(), // Example value for 'time'
  };

  const finishHandler = () => {
    onAdd(addPet);
    // if (userInfo) {
    //   setAddPet({...addPet, userId: userInfo?.userid});
    // }
    setAddPet({
      ...addPet,
      name: '',
      petType: petType.id,
      breed: '',
      gender: '',
      dob: new Date(),
    });
    setSelectedId('');
    onClose(false);
  };

  const resetForm = () => {
    setAddPet({
      name: '',
      petType: 0,
      breed: '',
      gender: '',
      dob: new Date(),
      userId: userInfo?.userid ?? '',
    });
    setPetType({id: 0, value: ''});
  };

  const petTypeId = (type: string) => {
    if (type == 'Dog') {
      return 1;
    } else if (type == 'Cat') {
      return 2;
    } else if (type == 'Other') {
      return 3;
    }
    return 0;
  };

  useEffect(() => {
    if (state === 'Edit' && petId) {
      const editData = userInfo?.pets.find(data => data.id === petId);
      console.log('data', editData);
      if (editData) {
        setAddPet({
          name: editData.name,
          breed: editData.breed,
          dob: new Date(editData.dob),
          petType: petTypeId(editData.type),
          userId: userInfo?.userid ?? '',
          gender: editData.gender,
        });
        const petTypeLabel =
          petTypes.find(type => type.label === editData.type)?.label || '';
        console.log('dataaaaa', petTypeLabel);
        setPetType({id: petTypeId(editData.type), value: petTypeLabel});
      }
    } else {
      resetForm();
    }
  }, [state, visible, petId]);

  useEffect(() => {
    console.log('tes', addPet);
  }, [addPet]);

  useEffect(() => {
    setAddPet({...addPet, petType: petType.id});
  }, [petType]);
  // useEffect(() => {
  //   console.log('guis', addPet);
  // }, [addPet]);
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{backgroundColor: transparent}} className="flex h-full">
        <View className="z-30 flex h-[65%] bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 pt-6 absolute">
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
              <View className="w-full space-y-[2px]">
                <Text className="font-semibold text-neutral-800 text-xs">
                  Pet Name
                </Text>
                <TextInput
                  placeholder="Enter name"
                  value={addPet?.name}
                  onChangeText={(text: string) =>
                    setAddPet({...addPet, name: text})
                  }
                  className="rounded-[14px] bg-neutral-100 py-2 px-3"></TextInput>
              </View>
              <View className="w-full space-y-[2px]">
                <Text className="font-semibold text-neutral-800 text-xs">
                  Pet Type
                </Text>
                <TouchableOpacity
                  onPress={() => setTypeVisible(!typeVisible)}
                  className="flex flex-row justify-between items-center px-3 py-2.5 bg-neutral-100 rounded-[14px]">
                  <Text className="text-sm text-neutral-500">
                    {petType.value || 'Select Type'}
                  </Text>
                  <DropdownIcon />
                </TouchableOpacity>
              </View>
              <View className="w-full space-y-[2px]">
                <Text className="font-semibold text-neutral-800 text-xs">
                  Breed/Description
                </Text>
                <TextInput
                  placeholder="Enter breed or description"
                  value={addPet.breed}
                  onChangeText={(text: string) =>
                    setAddPet({...addPet, breed: text})
                  }
                  className="rounded-[14px] bg-neutral-100 py-2 px-3"></TextInput>
              </View>
              <View className="w-full space-y-[2px]">
                <Text className="font-semibold text-neutral-800 text-xs">
                  Gender
                </Text>
                <View className="justify-between flex flex-row">
                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={a => {
                      setAddPet({...addPet, gender: a});
                      setSelectedId(a);
                    }}
                    selectedId={addPet.gender}
                    layout="row"
                    // labelStyle={styles.radio}
                  />
                </View>
              </View>
              <View className="w-full space-y-[2px]">
                <Text className="font-semibold text-neutral-800 text-xs">
                  Date of Birth
                </Text>
                <DatePicker
                  minimumDate={new Date(2000, 0, 1)}
                  item={{
                    time: state == 'Edit' ? Number(addPet.dob) : Date.now(),
                  }}
                  onDate={(a: Date) => setAddPet({...addPet, dob: a})}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={finishHandler}
              className="bg-primary-500 py-3 rounded-2xl shadow-md shadow-black mb-10">
              <Text className="text-center font-bold text-lg text-[#FFFFFF]">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PetTypeSlideModal
        state={state}
        petType={petType}
        visible={typeVisible}
        onClose={a => setTypeVisible(a)}
        onSelect={a => setPetType(a)}
      />
    </Modal>
  );
};

export default SlideModal;

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

import {FC, useContext, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import RoundWarning from '../../../icon/round-warning/round-warning';
import MoreVertical from '../../../icon/more-vertical/more-vertical';
import EditRemoveSlideModal from '../component/EditRemoveSlideModal';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import AddEditServiceSlideModal from '../component/AddEditServiceSlideModal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import * as yup from 'yup';
import OtherTypeIcon from '../../../icon/type/other-icon';
import {ScrollView} from 'react-native';
import {RegisterPFContext} from '../BePetFriend';

interface CheckSchema {
  hourlyPrice?: string;
  dailyPrice?: string;
}

interface IIndex {
  selectedIndex: () => void;
}
interface IPricelist {
  userId: string;
  hourlyPrice: string;
  dailyPrice: string;
  additionalTask: IAdditionaltask[];
}
interface IAdditionaltask {
  taskService: string;
  price: string;
  acceptDog: boolean;
  acceptCat: boolean;
  acceptOther: boolean;
}

const pricelistSchema = yup.object({
  hourlyPrice: yup.string().required(),
  dailyPrice: yup.string().required(),
});

const MyPricelist: FC<IIndex> = ({selectedIndex}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const registerPfContext = useContext(RegisterPFContext);
  const [hourlyPriceDec, setHourlyPriceDec] = useState<string>(registerPfContext?.priceList.hourlyPrice?? '');
  const [dailyPriceDec, setDailyPriceDec] = useState<string>(registerPfContext?.priceList.dailyPrice?? '');
  const [addEditShowModal, setAddEditShowModal] = useState<boolean>(false);
  const [editRemoveShowModal, setEditRemoveShowModal] =
    useState<boolean>(false);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const formatPrice = (value: string, setValueDec?: (val: string) => void) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (formattedValue.endsWith('.')) {
      formattedValue = formattedValue.slice(0, -1);
    }
    if (setValueDec) {
      setValueDec(formattedValue);
    }
    return formattedValue;
  };

  const handleHourlyPriceChange = (value: string) => {
    const formattedValue = formatPrice(value, setHourlyPriceDec);
  };

  const handleDailyPriceChange = (value: string) => {
    const formattedValue = formatPrice(value, setDailyPriceDec);
  };

  useEffect(() => {
    registerPfContext?.setPriceList({
      ...registerPfContext.priceList,
      dailyPrice: dailyPriceDec,
    });
  }, [dailyPriceDec]);

  useEffect(() => {
    registerPfContext?.setPriceList({
      ...registerPfContext.priceList,
      hourlyPrice: hourlyPriceDec,
    });
  }, [hourlyPriceDec]);


  useEffect(() => {
    const validate = async () => {
      const isValid = await pricelistSchema.isValid(registerPfContext?.priceList);
      setIsValidForm(isValid);
    };
    void validate();
  }, [registerPfContext?.priceList]);
  
  const showSelectedPet = (dog: boolean, cat: boolean, other: boolean) => {
    return (
      <View className="flex flex-row space-x-1.5">
        {dog && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="w-6 h-6 bg-primary-50 items-center justify-center  rounded-lg">
              <DogTypeIcon width={12} height={12} />
            </View>
            <Text className="font-semibold text-neutral-500 text-xs">Dog</Text>
          </View>
        )}
        {cat && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="w-6 h-6 bg-yellow-50 items-center justify-center  rounded-lg">
              <CatTypeIcon width={12} height={12} />
            </View>
            <Text className="font-semibold text-neutral-500 text-xs">Cat</Text>
          </View>
        )}
        {other && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="w-6 h-6 bg-red-50 items-center justify-center  rounded-lg">
              <OtherTypeIcon width={12} height={12} />
            </View>
            <Text className="font-semibold text-neutral-500 text-xs">
              Other
            </Text>
          </View>
        )}
      </View>
    );
  };

  const removeTask =()=>{

  }

  return (
    <>
      <EditRemoveSlideModal
        visible={editRemoveShowModal}
        onClose={() => setEditRemoveShowModal(!editRemoveShowModal)}
      />
      <AddEditServiceSlideModal
        onAdd={() => selectedIndex}
        visible={addEditShowModal}
        onClose={() => setAddEditShowModal(!addEditShowModal)}
      />

      <ScrollView>
        <View className="w-full flex flex-col space-y-2 px-4 pt-3">
          <Text className="text-lg font-bold text-neutral-800">
            My Pricelist
          </Text>
          <Text className="leading-5 text-sm text-neutral-500">
            Set up and add your pet care services and pricelist.
          </Text>
        </View>
        <View className="pt-6 pb-4 flex flex-col space-y-4 w-full px-4">
          <View className="flex flex-col gap-[2px] rounded-md">
            <Text className="text-neutral-800 text-xs font-bold">
              Hourly Price
            </Text>
            <View className="bg-neutral-100 px-2 flex flex-row items-center rounded-md justify-between">
              <View className="flex flex-row items-center space-x-2.5">
                <Text>IDR</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  value={registerPfContext?.priceList.hourlyPrice}
                  onChangeText={handleHourlyPriceChange}
                  placeholderTextColor="#64748B"
                  placeholder="000"
                  className="w-72"
                />
              </View>
              <Text>/hour</Text>
            </View>
          </View>

          <View className="flex flex-col gap-[2px] rounded-md">
            <Text className="text-neutral-800 text-xs font-bold">
              Daily Price
            </Text>
            <View className="bg-neutral-100 px-2 flex flex-row items-center rounded-md justify-between">
              <View className="flex flex-row items-center space-x-2.5">
                <Text>IDR</Text>
                <TextInput
                  keyboardType="decimal-pad"
                  value={registerPfContext?.priceList.dailyPrice}
                  onChangeText={handleDailyPriceChange}
                  placeholderTextColor="#64748B"
                  placeholder="000"
                  className="w-72"
                />
              </View>
              <Text>/daily</Text>
            </View>
          </View>

          <View className="rounded-[10px] bg-primary-50 items-center space-x-2 py-1.5 px-3 flex flex-row">
            <RoundWarning />
            <Text className="text-neutral-500 text-xs">
              Service price includes feeding pets.
            </Text>
          </View>
        </View>

        <View className="w-full flex flex-col space-y-4 pt-6 px-4 pb-32">
          <Text className="font-bold text-sm text-neutral-800">
            Additional Task Service
          </Text>
          {registerPfContext?.priceList.additionalTask.map(item => {
            return (
              <View className="border-[1px] w- rounded-2xl border-neutral-200 ">
                <View className="flex flex-row space-x-3 py-[14px] px-3  w-full bg-primary-00 justify-between">
                  <View className="flex flex-col space-y-1">
                    <Text className="font-semibold text-sm text-neutral-800 w-full">
                      {item.taskService}
                    </Text>
                    <Text className="font-bold text-sm text-primary-500">
                      IDR {formatPrice(`${item.price}`)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setEditRemoveShowModal(!editRemoveShowModal)}
                    className="w-6 h-6 bg-red-00 items-center justify-center">
                    <MoreVertical height={14} />
                  </TouchableOpacity>
                </View>

                <View className="border-t-[1px] border-neutral-200 bg-neutral-50 rounded-b-2xl py-3 px-3 flex flex-row space-x-2">
                  <View className=" flex flex-row items-center space-x-1.5">
                    {/* ini di map */}

                    {showSelectedPet(
                      item.acceptDog,
                      item.acceptCat,
                      item.acceptOther,
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <View className="flex flex-row px-3 py-3 w-full">
            <TouchableOpacity
              onPress={() => setAddEditShowModal(!addEditShowModal)}
              className="w-fit h-fit flex flex-row space-x-3 items-center">
              <View className="w-9 h-9 bg-neutral-100 rounded-[14px] items-center justify-center">
                <PlusIcon />
              </View>
              <Text className="font-bold text-sm text-neutral-500">
                Add Services
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="w-full flex flex-col absolute bottom-0 px-4 bg-[#FFFFFF] pb-10">
        {isValidForm ? (
          <TouchableOpacity onPress={()=>selectedIndex()} className="bg-primary-500 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF] text-base font-semibold">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            className="bg-neutral-300 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF] text-base font-semibold">Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default MyPricelist;

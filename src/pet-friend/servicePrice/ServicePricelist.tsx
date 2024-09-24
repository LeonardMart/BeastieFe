import React, {FC, useContext, useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import DatePicker from '../../../component/date-picker/DatePicker';
import DogTypeIcon from '../../../icon/type/dog-icon';
import MoreVertical from '../../../icon/more-vertical/more-vertical';
import CalenderIcon from '../../../icon/calender/calender';
import MaleIcon from '../../../icon/gender-icon/male-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import FemaleIcon from '../../../icon/gender-icon/female-icon';
import DeleteEditSlideModal from './component/DeleteEditSlideModal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import SlideModal from './component/SlideModal';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import axios from 'axios';
import {updatePet} from '../../../store/pet-owner/action';
import ToggleSwitch from 'toggle-switch-react-native';
import RoundWarning from '../../../icon/round-warning/round-warning';
import EditRemoveSlideModal from './component/EditRemoveSlideModal';
import AddEditServiceSlideModal from './component/AddEditServiceSlideModal';
import {savePetCareInfo} from '../../../store/pet-care/action';

interface IService {
  userId: string;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

interface IPricelist {
  userId: string;
  hourly_price: string;
  daily_price: string;
  additionalTask: Service[];
}

interface Service {
  id: number;
  service_name: string;
  price: string;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

const ServicePricelist: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pfUrl = 'http://10.0.2.2:4000';

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const pfInfo = useSelector((state: RootState) => state.petCare.petCareInfo);
  const [state, setState] = useState<'Add' | 'Edit'>('Add');
  const [addEditShowModal, setAddEditShowModal] = useState<boolean>(false);
  const [editRemoveShowModal, setEditRemoveShowModal] =
    useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [service, setService] = useState<IService>({
    userId: pfInfo?.user_id ?? '',
    accept_dog: pfInfo?.accept_dog ?? false,
    accept_cat: pfInfo?.accept_cat ?? false,
    accept_other: pfInfo?.accept_other ?? false,
  });
  const [priceList, setPricelist] = useState<IPricelist>({
    userId: pfInfo?.user_id ?? '',
    hourly_price: pfInfo?.hourly_price ?? '',
    daily_price: pfInfo?.daily_price ?? '',
    additionalTask: pfInfo?.additional_service ?? [],
  });

  const formatPrice = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (formattedValue.endsWith('.')) {
      formattedValue = formattedValue.slice(0, -1);
    }
    return formattedValue;
  };

  const selectedService = priceList.additionalTask.find(
    task => task.id === selectedServiceId,
  );

  const backHanler = () => {
    navigation.navigate('navigateToPfProfile' as never);
  };

  const calculate = () => {
    let selected = Object.values(service).filter(val => val === true).length;
    return selected;
  };

  // useEffect(() => {
  //   console.log('service', service);
  // }, [service]);

  // useEffect(() => {
  //   console.log('service', priceList);
  // }, [priceList]);

  useEffect(() => {
    console.log('service', pfInfo);
  }, [pfInfo]);

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

  const addServiceHandler = async () => {
    const body = {
      service,
      priceList,
    };
    try {
      const res = await axios.post(
        `${pfUrl}/authserviceprice/update-insert`,
        body,
      );
      if (res.status == 200) {
        console.log('masuk');
        await retrievePfInfo();
        // navigation.navigate('navigateToProfile' as never);
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const retrievePfInfo = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(
        `${pfUrl}/authretrievepf/retrieve/${pfInfo?.user_id}`,
        {
          signal: abortController.signal,
        },
      );
      if (res.status == 200) {
        console.log('masuk');
        const result = res.data.data[0];
        // console.log('asas', result);
        dispatch(savePetCareInfo(result));
        if(result){
          backHanler()
        }
        // navigation.navigate('navigateToPfProfile');
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
  };

  const handleAddEditService = (data: Service) => {
    if (state == 'Edit' && selectedServiceId) {
      const priceListIndex = priceList.additionalTask.findIndex(
        (item: Service) => item.id == selectedServiceId,
      );
      console.log("priceIndex", priceListIndex)
      if (priceListIndex != -1) {
        console.log("masuk")
        const updatedTask: Service[] = [...priceList.additionalTask];
        updatedTask[priceListIndex] = {
          ...updatedTask[priceListIndex],
          ...data,
        };
        setPricelist({...priceList, additionalTask: updatedTask});
      }
    } else if (state == 'Add') {
      setPricelist(prevPriceList => ({
        ...prevPriceList,
        additionalTask: [...prevPriceList.additionalTask, data],
      }));
    }
  };

  const removeHandler = () => {
    const updatedTask = priceList.additionalTask.filter(data => {
      return data.id != selectedServiceId;
    });

    if (updatedTask) {
      setPricelist({...priceList, additionalTask: updatedTask});
    }
  };

  useEffect(() => {
    console.log('service', pfInfo);
    // Update component state with new values from pfInfo
    if (pfInfo) {
      setService({
        userId: pfInfo.user_id,
        accept_dog: pfInfo.accept_dog,
        accept_cat: pfInfo.accept_cat,
        accept_other: pfInfo.accept_other,
      });
      setPricelist({
        userId: pfInfo.user_id,
        hourly_price: pfInfo.hourly_price,
        daily_price: pfInfo.daily_price,
        additionalTask: pfInfo.additional_service || [],
      });
    }
  }, [pfInfo]);

  
  useEffect(() => {
    console.log('testes', priceList);
  }, [priceList]);
  useEffect(() => {
    console.log('testes', selectedServiceId);
  }, [selectedServiceId]);

  return (
    <View className="h-full bg-[#FFFFFF]">
      <View className="flex flex-row w-full border-b-[1px] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          onPress={backHanler}
          className="items-center w-6 h-6 justify-center">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>

        <Text className="font-semibold text-neutral-800 text-base">
          Services & Pricelist
        </Text>
      </View>
      <View className="py-3 items-center px-4">
        <ScrollView>
          <View className="w-full flex flex-col space-y-2 ">
            <Text className="text-lg font-bold text-neutral-800">
              My Services
            </Text>
          </View>
          <View className="py-4 flex flex-col space-y-4">
            <View className="w-full flex flex-row items-center border-[1px] justify-between border-neutral-200 py-3 px-3 rounded-2xl">
              <View className="flex flex-row items-center space-x-3">
                <View className="w-9 h-9 bg-primary-50 items-center justify-center  rounded-[14px]">
                  <DogTypeIcon width={20} height={20} />
                </View>
                <Text className="text-sm font-bold text-neutral-800">Dog</Text>
              </View>
              <ToggleSwitch
                isOn={service.accept_dog}
                onColor="#4871F7"
                offColor="#CBD5E1"
                size="medium"
                onToggle={isOn => setService({...service, accept_dog: isOn})}
              />
            </View>

            <View className="w-full flex flex-row items-center border-[1px] justify-between border-neutral-200 py-3 px-3 rounded-2xl">
              <View className="flex flex-row items-center space-x-3">
                <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
                  <CatTypeIcon width={20} height={20} />
                </View>
                <Text className="text-sm font-bold text-neutral-800">Cat</Text>
              </View>
              <ToggleSwitch
                isOn={service.accept_cat}
                onColor="#4871F7"
                offColor="#CBD5E1"
                size="medium"
                onToggle={isOn => setService({...service, accept_cat: isOn})}
              />
            </View>

            <View className="w-full flex flex-row items-center border-[1px] justify-between border-neutral-200 py-3 px-3 rounded-2xl">
              <View className="flex flex-row items-center space-x-3">
                <View className="w-9 h-9 bg-red-50 items-center justify-center  rounded-[14px]">
                  <OtherTypeIcon width={20} height={20} />
                </View>
                <Text className="text-sm font-bold text-neutral-800">
                  Other
                </Text>
              </View>
              <ToggleSwitch
                isOn={service.accept_other}
                onColor="#4871F7"
                offColor="#CBD5E1"
                size="medium"
                onToggle={isOn => setService({...service, accept_other: isOn})}
              />
            </View>

            <View className="w-full flex flex-col pt-3">
              <Text className="text-lg font-bold text-neutral-800">
                My Pricelist
              </Text>
            </View>
            <View className="pt-3 pb-4 flex flex-col space-y-4 w-full">
              <View className="flex flex-col gap-[2px] rounded-md">
                <Text className="text-neutral-800 text-xs font-bold">
                  Hourly Price
                </Text>
                <View className="bg-neutral-100 px-2 flex flex-row items-center rounded-md justify-between">
                  <View className="flex flex-row items-center space-x-2.5">
                    <Text>IDR</Text>
                    <TextInput
                      keyboardType="decimal-pad"
                      value={formatPrice(priceList.hourly_price)}
                      onChangeText={a =>
                        setPricelist({
                          ...priceList,
                          hourly_price: a,
                        })
                      }
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
                      value={formatPrice(priceList.daily_price)}
                      onChangeText={a =>
                        setPricelist({
                          ...priceList,
                          daily_price: a,
                        })
                      }
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

            <View className="w-full flex flex-col space-y-4 pt-3 pb-32">
              <Text className="font-bold text-sm text-neutral-800">
                Additional Task Service
              </Text>
              {priceList.additionalTask.map(item => {
                return (
                  <View
                    key={item.id}
                    className="border-[1px] w- rounded-2xl border-neutral-200 ">
                    <View className="flex flex-row space-x-3 py-[14px] px-3  w-full bg-primary-00 justify-between">
                      <View className="flex flex-col space-y-1">
                        <Text className="font-semibold text-sm text-neutral-800 w-full">
                          {item.service_name}
                        </Text>
                        <Text className="font-bold text-sm text-primary-500">
                          IDR {formatPrice(`${item.price}`)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setEditRemoveShowModal(!editRemoveShowModal),
                            setSelectedServiceId(item.id);
                        }}
                        className="w-6 h-6 bg-red-00 items-center justify-center">
                        <MoreVertical height={14} />
                      </TouchableOpacity>
                    </View>

                    <View className="border-t-[1px] border-neutral-200 bg-neutral-50 rounded-b-2xl py-3 px-3 flex flex-row space-x-2">
                      <View className=" flex flex-row items-center space-x-1.5">
                        {showSelectedPet(
                          item.accept_dog,
                          item.accept_cat,
                          item.accept_other,
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}

              <View className="flex flex-row px-3 py-3 w-full">
                <TouchableOpacity
                  onPress={() => {
                    setAddEditShowModal(!addEditShowModal), setState('Add');
                  }}
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
          </View>
        </ScrollView>
      </View>

      <View className="w-full flex flex-col absolute bottom-0 pb-10 bg-[#FFFFFF] px-4">
        <TouchableOpacity
          onPress={addServiceHandler}
          className="bg-primary-500 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
          <Text className="text-[#FFFFFF] text-base font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
      <EditRemoveSlideModal
        visible={editRemoveShowModal}
        onClose={() => setEditRemoveShowModal(!editRemoveShowModal)}
        onEdit={() => {
          setAddEditShowModal(!addEditShowModal), setState('Edit');
        }}
        onRemove={removeHandler}
      />
      <AddEditServiceSlideModal
        data={selectedService}
        state={state}
        onAdd={handleAddEditService}
        visible={addEditShowModal}
        onClose={() => setAddEditShowModal(!addEditShowModal)}
      />
    </View>
  );
};

export default ServicePricelist;

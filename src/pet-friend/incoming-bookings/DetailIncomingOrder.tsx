import {FC, useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {OwnerHistory} from '../../../store/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import CalenderIcon from '../../../icon/calender/calender';
import WarningIcon from '../../../icon/round-warning/warning-icon';
import StarRating from 'react-native-star-rating-widget';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import {savePfOrderInfo} from '../../../store/pet-care/incoming-order/incomingOrderAction';

interface INavigation {
  navigation: any;
}

interface IAddress {
  id: number;
  label: string;
  detail_address: string;
  lat: number;
  long: number;
}

type DetailOrderProps = RouteProp<RootStackParamList, 'navigateToDetailOrder'>;

const DetailIncomingOrder: FC<INavigation> = ({navigation}) => {
  const orderInfo = useSelector(
    (state: RootState) => state.pfOrder.pfOrderInfo,
  );
  const pfInfo = useSelector((state: RootState) => state.petCare?.petCareInfo);

  const route = useRoute<DetailOrderProps>();
  const {orderId} = route.params;
  const [data, setData] = useState<OwnerHistory>();
  const [starRating, setStarRating] = useState<number>(0);
  const baseUrl = `http://10.0.2.2:4000/authPf`;
  const {sendRequest} = useHttpRequest(baseUrl);
  const Base = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest: getRequest} = useHttpRequest(Base);
  const dispatch = useDispatch();
  const [userAddress, setUserAddress] = useState<IAddress | undefined>(
    undefined,
  );
  const [ownerAddress, setOwnerAddress] = useState<IAddress | undefined>(
    undefined,
  );

  useEffect(() => {
    const newData = orderInfo?.filter(item => item.order_id == orderId);
    if (newData) {
      setData(newData[0]);
    }
  }, [orderId, pfInfo, orderInfo]);

  const getOrderList = async () => {
    const res = await getRequest({
      url: `/retrievePfOrder/${pfInfo?.user_id}`,
      method: 'get',
    });
    if (res.status == 1) {
      console.log('res', res.data);
      dispatch(savePfOrderInfo(res.data));
    }
  };

  const getFormattedDateDifference = (
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    if (start && end) {
      const msInHour = 1000 * 60 * 60;
      const msInDay = msInHour * 24;

      const diffInMs = end.getTime() - start.getTime();
      const days = Math.floor(diffInMs / msInDay);
      const hours = Math.floor((diffInMs % msInDay) / msInHour);

      return `${days} days ${hours} hours`;
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (date) {
      return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    }
  };

  const formatTime = (date: Date | undefined) => {
    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const taskAssigned = (petId: number) => {
    if (data) {
      const pet = data.pets.find(item => item.pet_id === petId);
      if (pet?.services) {
        const service = pet?.services.filter(
          item => item.count != 0 || item.count > 0,
        );
        return service ? service.length : 0;
      } else {
        return 0;
      }
    }
  };

  const findAddress = (userAddressId: number | undefined) => {
    const address = data?.address.find(item => item.id == userAddressId);
    return address?.detail_address;
  };

  useEffect(() => {
    if (data) {
      const selectedAddress = data.address.find(
        add => add.id == data.pf_address_id,
      );
      setUserAddress(selectedAddress);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const selectedAddress = data.address.find(
        add => add.id == data.owner_address_id,
      );
      setOwnerAddress(selectedAddress);
    }
  }, [data]);

 
  const openMaps = () => {
    const startLatLng = `${userAddress?.lat},${userAddress?.long}`;
    const endLatLng = `${ownerAddress?.lat},${ownerAddress?.long}`;
    const label = 'Pet Friend Location';

    const url = Platform.select({
      ios: `http://maps.apple.com/?saddr=${startLatLng}&daddr=${endLatLng}`,
      android: `https://www.google.com/maps/dir/?api=1&origin=${startLatLng}&destination=${endLatLng}&travelmode=driving`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const cancelOrder = async () => {
    const body = {
      orderId,
      userId: pfInfo?.user_id,
    };
    const res = await sendRequest({
      url: `/cancelOrder`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      await getOrderList();
    }
  };

  const confirmOrder = async () => {
    const body = {
      orderId,
    };
    const res = await sendRequest({
      url: `/confirmOrder`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      await getOrderList();
    }
  };

  const petReceived = async () => {
    const body = {
      orderId,
    };
    const res = await sendRequest({
      url: `/petReceived`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      await getOrderList();
    }
  };

  const finishPetCare = async () => {
    const body = {
      orderId,
    };
    const res = await sendRequest({
      url: `/finishPetCare`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      await getOrderList();
    }
  };

  const finishOrder = async () => {
    const body = {
      orderId,
    };
    const res = await sendRequest({
      url: `/finishOrder`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      await getOrderList();
    }
  };

  const status = () => {
    if (data?.is_canceled_owner || data?.is_canceled_pf) {
      return 'Canceled';
    } else if (!data?.is_canceled_owner || !data?.is_canceled_pf) {
      if (!data?.is_confirm_pf) {
        return 'Waiting for Confirmation';
      } else if (data.is_confirm_pf) {
        if (data.is_pet_received) {
          if (data.is_finish_pet_care) {
            if (data.is_finish_pf && data.is_finish_owner) {
              return 'Care Completed';
            } else if (data.is_finish_pf && !data.is_finish_owner) {
              return 'Waiting for Pet Owner Confirmation';
            }
            return 'Delivering Pet';
          }
          return 'Taking care pet';
        } else {
          if (data?.delivery_id == 1) {
            return 'Pickup Pet';
          } else {
            return 'Self Delivery';
          }
        }
      }
    }
  };

  return (
    <>
      <View className="flex flex-row w-full border-b-[1px] bg-[#FFFFFF] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          className="items-center w-6 h-6 justify-center"
          onPress={() => navigation.goBack()}>
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
        <Text className="font-semibold text-neutral-800 text-base">
          Booking Detail
        </Text>
      </View>
      <ScrollView className="bg-[#FFFFFF]">
        <View className="flex flex-col px-4 py-3 border-b-[1px] border-neutral-100">
          <View className="flex flex-row justify-between">
            {data?.status == 'Complete' && (
              <View className="bg-success-50 py-1 px-2 rounded-lg">
                <Text className="text-success-500 text-[10px] font-bold">
                  {data.status}
                </Text>
              </View>
            )}
            {data?.status == 'Ongoing' && (
              <View className="bg-yellow-50 py-1 px-2 rounded-lg">
                <Text className="text-yellow-500 text-[10px] font-bold">
                  {data.status}
                </Text>
              </View>
            )}
            {(data?.is_canceled_pf == true ||
              data?.is_canceled_owner == true || data?.status == 'Canceled by System') && (
              <View className="bg-red-50 py-1 px-2 rounded-lg">
                <Text className="text-red-500 text-[10px] font-bold">
                  {data.status}
                </Text>
              </View>
            )}
            {/* {data?.status === 'Canceled by System' && (
              <View className="bg-red-50 py-1 px-2 rounded-lg">
                <Text className="text-red-500 text-[10px] font-bold">
                  {data.status}
                </Text>
              </View>
            )} */}
            <Text className="font-semibold text-neutral-800 text-sm">
              {status()}
            </Text>
          </View>
        </View>

        <View className="flex flex-col px-4 py-6 space-y-4 border-[1px] border-neutral-100">
          <View className="flex flex-row items-start space-x-3">
            <View className="bg-neutral-100 w-[40px] h-[40px] items-center justify-center rounded-[14px]">
              <ProfileIcon height={25} width={25} />
            </View>
            <View className="flex flex-col w-full space-y-1 ">
              <Text className="font-bold text-sm text-neutral-800">
                {data?.pet_friend}
              </Text>
              <View className="flex flex-row items-center space-x-1.5">
                <Text className="text-xs text-neutral-500">
                  {data?.distance} Km
                </Text>
              </View>
            </View>
          </View>
          {data?.delivery_id == 1 && (
            <View className="border-[1px] border-neutral-200 rounded-2xl p-3 space-y-2">
              <Text className="font-semibold text-neutral-800 text-xs">
                Pickup by Pet Friend
              </Text>
              <Text className="text-neutral-500 text-xs">
                {findAddress(data?.owner_address_id)}
              </Text>
              <TouchableOpacity onPress={openMaps} className="bg-primary-50 w-full items-center py-3 rounded-2xl">
                <Text className="text-sm font-bold text-primary-500">
                  Get Direction
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="flex flex-col px-4 py-6 border-y-[1px] border-neutral-100 space-y-2.5">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-sm font-bold text-neutral-800">Schedule</Text>
            <Text className="text-[10px] font-semibold text-neutral-500">
              {getFormattedDateDifference(
                new Date(data?.start_date ?? new Date()),
                new Date(data?.end_date ?? new Date()),
              )}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-3">
            <View className="p-1.5 bg-neutral-100 rounded-lg">
              <CalenderIcon />
            </View>
            <View className="flex flex-col">
              <Text className="text-neutral-500 text-xs">From</Text>
              <View className="flex flex-row space-x-1.5 items-center">
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatDate(new Date(data?.start_date ?? new Date()))}
                </Text>
                <View className="w-1 h-1 bg-neutral-500 rounded-full" />
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatTime(new Date(data?.start_date ?? new Date()))}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-col space-y-1 w-6 items-center">
            <View className="w-1 h-1 bg-neutral-200 rounded-full" />
            <View className="w-1 h-1 bg-neutral-200 rounded-full" />
            <View className="w-1 h-1 bg-neutral-200 rounded-full" />
          </View>
          <View className="flex flex-row items-center space-x-3">
            <View className="p-1.5 bg-neutral-100 rounded-lg">
              <CalenderIcon />
            </View>
            <View className="flex flex-col">
              <Text className="text-neutral-500 text-xs">Until</Text>
              <View className="flex flex-row space-x-1.5 items-center">
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatDate(new Date(data?.end_date ?? new Date()))}
                </Text>
                <View className="w-1 h-1 bg-neutral-500 rounded-full" />
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatTime(new Date(data?.end_date ?? new Date()))}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-col border-y-[1px] border-neutral-100 px-4 py-6 space-y-3">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-sm font-bold text-neutral-800">
              Pet & Task
            </Text>
            <Text className="text-[10px] font-semibold text-neutral-500">
              {data?.pets.length} pets
            </Text>
          </View>

          {data?.pets.map(item => (
            <View
              key={item.pet_id}
              className="border-[1px] w-full rounded-2xl border-neutral-200">
              <View className="flex flex-row items-center space-x-3 py-[14px] px-3 w-full bg-primary-00 justify-between">
                <View className="flex flex-row space-x-3">
                  {item.type === 'Dog' && (
                    <View className="w-9 h-9 bg-primary-50 items-center justify-center rounded-[14px]">
                      <DogTypeIcon />
                    </View>
                  )}
                  {item.type === 'Cat' && (
                    <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center rounded-[14px]">
                      <CatTypeIcon />
                    </View>
                  )}
                  {item.type === 'Other' && (
                    <View className="w-9 h-9 bg-red-50 items-center justify-center rounded-[14px]">
                      <OtherTypeIcon />
                    </View>
                  )}
                  <View>
                    <Text className="font-semibold text-xs text-neutral-500 w-full">
                      {item.breed}
                    </Text>
                    <Text className="font-bold text-sm text-neutral-800">
                      {item.pet_name}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="border-t-[1px] border-neutral-200 bg-[#FFFFFF] rounded-b-2xl py-3 px-3 flex flex-row">
                <View className="flex flex-col space-y-1.5 w-full">
                  <Text className="text-[10px] font-semibold text-neutral-500">
                    {taskAssigned(item.pet_id)} task assigned
                  </Text>
                  <View>
                    <View className="flex flex-col space-y-1">
                      {item?.services?.map(service => (
                        <View
                          key={service.task_id}
                          className="flex flex-row items-center justify-between">
                          <View className="flex flex-row space-x-2 items-center">
                            <View className="bg-yellow-500 w-4 h-4 rounded-md items-center justify-center">
                              <WarningIcon />
                            </View>
                            <Text className="font-semibold text-xs text-neutral-800">
                              {service.service_name}
                            </Text>
                          </View>
                          <Text className="text-neutral-500 text-xs">
                            {service.count} time
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="flex flex-col border-y-[1px] border-neutral-100 px-4 py-6 space-y-3">
          <View className="border-[1px] border-neutral-200 rounded-2xl flex flex-col space-y-3 p-3">
            <Text className="font-bold text-neutral-800 text-sm">
              Payment summary
            </Text>
            <View className="flex flex-col space-y-1">
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">
                  Daily price (x{data?.daily_amount})
                </Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice((data?.daily_price ?? '').toString())}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">
                  Hourly price (x{data?.hourly_amount})
                </Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice((data?.hourly_price ?? '').toString())}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">Services</Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice((data?.service_price ?? '').toString())}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">
                  Platform fee (2.5%)
                </Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice(((data?.price ?? 0) * 0.025).toString())}
                </Text>
              </View>
            </View>
            <View className="flex flex-row border-t-[1px] border-neutral-100 pt-3 justify-between">
              <Text className="font-bold text-xs text-neutral-800">
                Total Income
              </Text>
              <Text className="font-bold text-xs text-neutral-800">
                IDR{' '}
                {formatPrice(
                  (
                    (data?.price ?? 0) -
                      (data?.platform_fee ?? 0) -
                      (data?.price ?? 0) * 0.025 ?? ''
                  ).toString(),
                )}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {data?.status != 'Complete' &&
        !data?.is_canceled_pf &&
        !data?.is_canceled_owner &&
        new Date(data?.end_date ?? '') > new Date() &&
        !data?.is_finish_pf && (
          <View className="flex flex-col bg-[#FFFFFF] border-t-[1px] py-4 px-4 border-neutral-200">
            <View className="flex flex-row w-full bg-[#FFFFFF] items-center space-x-3">
              {!data?.is_finish_pet_care && (
                <TouchableOpacity
                  onPress={cancelOrder}
                  className={`items-center w-[50%] bg-[#FFFFFFF] py-3 px-10 justify-center rounded-2xl border-[1px] border-neutral-200`}>
                  <Text className="font-bold text-sm text-neutral-800">
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}

              {!data?.is_confirm_pf ? (
                <TouchableOpacity
                  onPress={confirmOrder}
                  className="items-center w-[50%] bg-primary-500 py-3 px-10 justify-center rounded-2xl">
                  <Text className="font-bold text-sm text-[#FFFFFF]">
                    Confirm
                  </Text>
                </TouchableOpacity>
              ) : !data.is_pet_received ? (
                <TouchableOpacity
                  onPress={petReceived}
                  className="items-center w-[50%] bg-primary-500 py-3 px-10 justify-center rounded-2xl">
                  <Text className="font-bold text-sm text-[#FFFFFF]">
                    {data.delivery_id == 1 ? 'Finish Pickup' : 'Pet Received'}
                  </Text>
                </TouchableOpacity>
              ) : !data.is_finish_pet_care ? (
                <TouchableOpacity
                  onPress={finishPetCare}
                  className="items-center w-[50%] bg-primary-500 py-3 px-10 justify-center rounded-2xl">
                  <Text className="font-bold text-sm text-[#FFFFFF]">
                    Finish Pet Care
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={finishOrder}
                  className="items-center w-full bg-primary-500 py-3 px-10 justify-center rounded-2xl">
                  <Text className="font-bold text-sm text-[#FFFFFF]">
                    Finish
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
    </>
  );
};

export default DetailIncomingOrder;

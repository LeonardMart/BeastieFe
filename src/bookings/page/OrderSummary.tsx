import {FC, useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import {BookingContext} from '../Bookings';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import LocationIconSolid from '../../../icon/location-icon/location-icon';
import LocationIcon from '../../../icon/location-icon/location';
import NextArrow from '../../../icon/next-arrow/next-arrow';
import CalenderIcon from '../../../icon/calender/calender';
import WarningIcon from '../../../icon/round-warning/warning-icon';
import PickupSlideModal from '../component/PickupSlideModal';

interface IBookings {
  nextPage: () => void;
  backPage: () => void;
  pfId: string;
  onOrder: () => void;
}

interface IAddress {
  id: number;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  owner_flag: boolean;
}

interface petFriend {
  user_id: string;
  username: string;
  price_hourly: number;
  price_daily: number;
  detail_address: string;
  distance: number;
  address_id: number;
  location_lat: number;
  location_long: number;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  dob: string;
}

const OrderSummary: FC<IBookings> = ({nextPage, backPage, pfId, onOrder}) => {
  const bookingContext = useContext(BookingContext);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [userAddress, setUserAddress] = useState<IAddress | undefined>(
    undefined,
  );
  const [pickupSlidemodal, setPickupSlidemodal] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet[]>([]);
  const [pfInfo, setPfInfo] = useState<petFriend>();
  const [price, setPrice] = useState({
    total_days: 0,
    daily_price: 0,
    total_hours: 0,
    hourly_price: 0,
    service_price: 0,
    platform_fee: 2000,
    total_price: 0,
  });
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);

  const getPfInfo = async () => {
    const res = await sendRequest({
      url: `/retrievePf/${pfId}/${userAddress?.latitude}/${userAddress?.longitude}/${userInfo?.userid}`,
      method: 'get',
    });
    if (res.status == 1) {
      console.log("res",res.data)
      setPfInfo(res.data[0]);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const selectedAddress = userInfo.useraddress.find(
        data => data.owner_flag == true,
      );
      setUserAddress(selectedAddress);
    }
  }, [userInfo]);

  useEffect(() => {
    getPfInfo().catch(e => console.log('error retrieve pf', e));
  }, [userInfo, pfId, userAddress]);

  useEffect(() => {
    console.log('dapat', pfInfo);
  }, [pfInfo]);

  const getFormattedDateDifference = (
    start: Date | undefined,
    end: Date | undefined,
  ) => {
    console.log("date",start, end)
    if (start && end) {
      const msInHour = 1000 * 60 * 60;
      const msInDay = msInHour * 24;

      const diffInMs = end.getTime() - start.getTime();
      const days = Math.floor(diffInMs / msInDay);
      const hours = Math.floor((diffInMs % msInDay) / msInHour);

      return `${days} days ${hours} hours`;
    }
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const convertFromUTC = (date: Date|undefined): Date|undefined => {
    if(date)
      return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  useEffect(() => {
    const formattedDateDifference = getFormattedDateDifference(
      bookingContext?.booking.startDate,
      bookingContext?.booking.endDate,
    );

    if (formattedDateDifference && pfInfo) {
      const {price_daily, price_hourly} = pfInfo;
      const parts = formattedDateDifference.split(' ');

      // Extract days and hours correctly
      const days = parts[0] ? parseInt(parts[0], 10) : 0;
      const hours = parts[2] ? parseInt(parts[2], 10) : 0;

      const dailyPrice = days * price_daily;
      const hourlyPrice = hours * price_hourly;

      setPrice(prevPrice => ({
        ...prevPrice,
        total_days: days,
        total_hours: hours,
        daily_price: dailyPrice,
        hourly_price: hourlyPrice,
      }));
    }
  }, [
    bookingContext?.booking.startDate,
    bookingContext?.booking.endDate,
    pfInfo,
  ]);

  useEffect(() => {
    let totalServicePrice = 0;

    bookingContext?.booking.pets.forEach(pet => {
      pet.service.forEach(item => {
        totalServicePrice += Number(item.price) * item.count;
      });
    });

    setPrice(prevPrice => ({
      ...prevPrice,
      service: totalServicePrice,
    }));
  }, [bookingContext?.booking.pets]);

  const formatDate = (date: Date | undefined) => {
    if (date) {
      console.log("data", new Date(date).toString())
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

  useEffect(() => {
    const newPets = bookingContext?.booking.pets
      .flatMap(item => userInfo?.pets.filter(data => data.id === item.id))
      .filter((pet): pet is Pet => pet !== undefined);
    if (newPets) {
      setSelectedPet(newPets);
    }
  }, [bookingContext?.booking.pets]);

  useEffect(() => {
    let totalServicePrice = 0;
  
    bookingContext?.booking.pets.forEach(pet => {
      pet.service.forEach(item => {
        totalServicePrice += Number(item.price) * item.count;
      });
    });
  
    setPrice(prevPrice => ({
      ...prevPrice,
      service_price: totalServicePrice,
    }));
  }, [bookingContext?.booking.pets]);

  const taskAssigned = (petId: number) => {
    const pet = bookingContext?.booking.pets.find(item => item.id === petId);
    const service = pet?.service.filter(
      item => item.count != 0 || item.count > 0,
    );
    return service ? service.length : 0;
  };

  useEffect(() => {
    if (bookingContext?.booking)
      bookingContext.setBooking({
        ...bookingContext.booking,
        owner_address_id: userAddress?.id ?? 0,
        pf_address_id: pfInfo?.address_id ?? 0,
      });
  }, [bookingContext?.booking.delivery]);

  useEffect(() => {
    bookingContext?.setBooking({
      ...bookingContext.booking,
      total_price:
        price.daily_price +
        price.hourly_price +
        price.service_price +
        price.platform_fee,
    });
    // setPrice({
    //   ...price,
    //   total_price:
    //     price.daily_price +
    //     price.hourly_price +
    //     price.service_price +
    //     price.platform_fee,
    // });
    bookingContext?.setPrice(price);
  }, [price]);

  // useEffect(() => {
  //   console.log('price', bookingContext?.price);
  // }, [bookingContext?.price]);

  const showSelectedPet = (
    dog: boolean | undefined,
    cat: boolean | undefined,
    other: boolean | undefined,
  ) => {
    return (
      <View className="flex flex-row space-x-1.5">
        {dog && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="p-1 bg-primary-50 items-center justify-center rounded-lg">
              <DogTypeIcon width={12} height={12} />
            </View>
            <Text className="font-semibold text-neutral-500 text-xs">Dog</Text>
          </View>
        )}
        {cat && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="p-1 bg-yellow-50 items-center justify-center rounded-lg">
              <CatTypeIcon width={12} height={12} />
            </View>
            <Text className="font-semibold text-neutral-500 text-xs">Cat</Text>
          </View>
        )}
        {other && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="p-1 bg-red-50 items-center justify-center rounded-lg">
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

  return (
    <>
      <View className="flex flex-row w-full border-b-[1px] bg-[#FFFFFF] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          onPress={backPage}
          className="items-center w-6 h-6 justify-center">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
        <Text className="font-semibold text-neutral-800 text-base">
          Booking Detail
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-col px-4 py-6 space-y-4 border-b-[1px] border-neutral-100">
          <View className="flex flex-row items-start space-x-3">
            <View className="bg-neutral-100 w-[40px] h-[40px] items-center justify-center rounded-[14px]">
              <ProfileIcon height={25} width={25} />
            </View>
            <View className="flex flex-col w-full space-y-1 ">
              <Text className="font-bold text-sm text-neutral-800">
                {pfInfo?.username}
              </Text>
              <View className="flex flex-row items-center space-x-1.5">
                <Text className="text-xs text-neutral-500">
                  {pfInfo?.distance} Km
                </Text>
                <View className="h-[3px] w-[3px] rounded-full bg-neutral-500"></View>
                <Text className="text-xs text-neutral-500">
                  {pfInfo?.detail_address}
                </Text>
              </View>

              {showSelectedPet(
                pfInfo?.accept_dog,
                pfInfo?.accept_cat,
                pfInfo?.accept_other,
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setPickupSlidemodal(!pickupSlidemodal)}
            className="flex flex-row justify-between items-center rounded-2xl border-[1px] border-neutral-200 p-3">
            <View className="flex flex-row space-x-3 items-center">
              <View className="p-1.5 bg-neutral-100 rounded-md">
                <LocationIconSolid />
              </View>
              <Text className="font-semibold text-neutral-800 text-xs">
                {bookingContext?.booking.delivery == 0
                  ? 'Select Delivery Method'
                  : bookingContext?.booking.delivery == 1
                  ? 'Pickup By Pet friend'
                  : bookingContext?.booking.delivery == 2 && 'Self Delivery'}
              </Text>
            </View>
            <NextArrow color="neutral-400" />
          </TouchableOpacity>
        </View>

        <View className="flex flex-col px-4 py-6 border-y-[1px] border-neutral-100 space-y-2.5">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-col">
              <Text className="text-sm font-bold text-neutral-800">
                Schedule
              </Text>
              <Text className="text-[10px] font-semibold text-neutral-500">
                {getFormattedDateDifference(
                  bookingContext?.booking.startDate,
                  bookingContext?.booking.endDate,
                )}
              </Text>
            </View>
            <TouchableOpacity className="px-3 py-1.5 bg-primary-50 rounded-xl">
              <Text className="text-primary-500 font-semibold text-xs">
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center space-x-3">
            <View className="p-1.5 bg-neutral-100 rounded-lg">
              <CalenderIcon />
            </View>
            <View className="flex flex-col">
              <Text className="text-neutral-500 text-xs">From</Text>
              <View className="flex flex-row space-x-1.5 items-center">
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatDate(convertFromUTC(bookingContext?.booking.startDate))}
                </Text>
                <View className="w-1 h-1 bg-neutral-500 rounded-full" />
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatTime(convertFromUTC(bookingContext?.booking.startDate))}
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
                  {formatDate(convertFromUTC(bookingContext?.booking.endDate))}
                </Text>
                <View className="w-1 h-1 bg-neutral-500 rounded-full" />
                <Text className="font-semibold text-neutral-500 text-sm">
                  {formatTime(convertFromUTC(bookingContext?.booking.endDate))}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-col border-y-[1px] border-neutral-100 px-4 py-6 space-y-3">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-col">
              <Text className="text-sm font-bold text-neutral-800">
                Pet & Task
              </Text>
              <Text className="text-[10px] font-semibold text-neutral-500">
                Re-check your pets & task detail
              </Text>
            </View>
            <TouchableOpacity className="px-3 py-1.5 bg-primary-50 rounded-xl">
              <Text className="text-primary-500 font-semibold text-xs">
                Change
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
                  <View>
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
                  Daily price (x{price.total_days})
                </Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice(price.daily_price.toString())}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">
                  Hourly price (x{price.total_hours})
                </Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice(price.hourly_price.toString())}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">Services</Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice(price.service_price.toString())}
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-neutral-500 text-xs">Platform fee</Text>
                <Text className="text-neutral-500 text-xs">
                  IDR {formatPrice(price.platform_fee.toString())}
                </Text>
              </View>
            </View>
            <View className="flex flex-row border-t-[1px] border-neutral-100 pt-3 justify-between">
              <Text className="font-bold text-xs text-neutral-800">
                Total Payment
              </Text>
              <Text className="font-bold text-xs text-neutral-800">
                IDR{' '}
                {formatPrice(
                  (
                    price.daily_price +
                    price.hourly_price +
                    price.service_price +
                    price.platform_fee
                  ).toString(),
                )}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex flex-row w-full border-t-[1px] bg-[#FFFFFF] border-neutral-200 py-4 px-4 items-center space-x-3 justify-between">
        <View className="flex flex-col">
          <Text>Total Payment</Text>
          <Text className="font-semibold text-neutral-800 text-base">
            IDR{' '}
            {formatPrice(
              (
                price.daily_price +
                price.hourly_price +
                price.service_price +
                price.platform_fee
              ).toString(),
            )}
          </Text>
        </View>
        {bookingContext?.booking.delivery != 0 ? (
          <TouchableOpacity
            onPress={onOrder}
            className="items-center bg-primary-500 py-3 px-10 justify-center rounded-2xl">
            <Text className="font-bold text-sm text-[#FFFFFF]">Order</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            className="items-center bg-neutral-300 py-3 px-10 justify-center rounded-2xl">
            <Text className="font-bold text-sm text-[#FFFFFF]">Order</Text>
          </TouchableOpacity>
        )}
      </View>
      <PickupSlideModal
        pickupBtn="Pickup by Pet Friend"
        selfBtn="Self Delivery"
        visible={pickupSlidemodal}
        onClose={() => setPickupSlidemodal(!pickupSlidemodal)}
        onPickup={() => {
          bookingContext?.setBooking({...bookingContext.booking, delivery: 1});
          setPickupSlidemodal(!pickupSlidemodal);
        }}
        onSelf={() => {
          bookingContext?.setBooking({...bookingContext.booking, delivery: 2});
          setPickupSlidemodal(!pickupSlidemodal);
        }}
      />
    </>
  );
};

export default OrderSummary;

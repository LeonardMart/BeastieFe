import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import NextArrow from '../../../icon/next-arrow/next-arrow';
import LogoutIcon from '../../../icon/logout-icon/logout-icon';
import LocationIcon from '../../../icon/location-icon/location';
import LoveIcon from '../../../icon/love/love-icon';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import FilledStarIcon from '../../../icon/star-icon/filled-star-icon';
import GreenLocationIcon from '../../../icon/location-icon/location-green';
import TimePicker from '../../../component/time-picker/TimePicker';
import DatePicker from '../../../component/date-picker/DatePicker';
import {BookingContext} from '../Bookings';
import SelectPetSlideModal from '../component/SelectPetSlideModal';
import FilledLoveIcon from '../../../icon/love-icon/filled-love-icon';

interface IBookings {
  selectedIndex: () => void;
  pfId: string;
  acceptedPet: acceptedPet;
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
  location_lat: number;
  location_long: number;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
  avg_rating: number;
  review_count: number;
  bookmark: boolean;
}
interface acceptedPet {
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}

const Duration: FC<IBookings> = ({selectedIndex, pfId, acceptedPet}) => {
  const bookingContext = useContext(BookingContext);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [userAddress, setUserAddress] = useState<IAddress | undefined>(
    undefined,
  );
  const [pfInfo, setPfInfo] = useState<petFriend>();
  const navigation = useNavigation();
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [startDateTime, setStartDateTime] = useState<Date>(
    bookingContext?.booking.startDate || new Date(),
  );
  const [endDateTime, setEndDateTime] = useState<Date>(
    bookingContext?.booking.endDate || new Date(),
  );
  const [isValid, setIsValid] = useState<boolean>(true);
  // const [acceptedPet, setAcceptedPet] = useState<acceptedPet>({
  //   accept_dog: false,
  //   accept_cat: false,
  //   accept_other: false,
  // });

  const handleDateChange = (date: Date, isStart: boolean) => {
    if (isStart) {
      setStartDateTime(prevDateTime => {
        const newDateTime = new Date(prevDateTime);
        newDateTime.setFullYear(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );
        return newDateTime;
      });
    } else {
      setEndDateTime(prevDateTime => {
        const newDateTime = new Date(prevDateTime);
        newDateTime.setFullYear(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );
        return newDateTime;
      });
    }
    validateDates();
  };

  const handleTimeChange = (
    hours: number,
    minutes: number,
    isStart: boolean,
  ) => {
    if (isStart) {
      setStartDateTime(prevDateTime => {
        const newDateTime = new Date(prevDateTime);
        newDateTime.setHours(hours, minutes);
        // bookingContext?.setBooking({
        //   ...bookingContext.booking,
        //   startDate: newDateTime,
        //   endDate: endDateTime,
        // });
        return newDateTime;
      });
    } else {
      setEndDateTime(prevDateTime => {
        const newDateTime = new Date(prevDateTime);
        newDateTime.setHours(hours, minutes);
        // bookingContext?.setBooking({
        //   ...bookingContext.booking,
        //   startDate: startDateTime,
        //   endDate: endDateTime,
        // });
        return newDateTime;
      });
    }
    validateDates();
  };

  const validateDates = () => {
    setIsValid(startDateTime < endDateTime);
  };

  const convertToUTC = (date: Date): Date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  };

  useEffect(() => {
    bookingContext?.setBooking({
      ...bookingContext.booking,
      startDate: convertToUTC(startDateTime),
      endDate: convertToUTC(endDateTime),
    });
  }, [startDateTime, endDateTime]);
  // useEffect(() => {
  //   bookingContext?.setBooking({
  //     ...bookingContext.booking,
  //     startDate: startDateTime,
  //     endDate: endDateTime,
  //   });
  // }, [startDateTime, endDateTime]);

  const item = {
    date: Date.now(),
    time: 0, // Example value for 'time'
  };

  const formatPrice = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (formattedValue.endsWith('.')) {
      formattedValue = formattedValue.slice(0, -1);
    }
    return formattedValue;
  };

  // useEffect(() => {
  //   console.log('testes', bookingContext?.booking);
  // }, [bookingContext, startDateTime, endDateTime]);

  useEffect(() => {
    if (bookingContext?.booking.startDate) {
      setStartDateTime(bookingContext.booking.startDate);
    }
    if (bookingContext?.booking.endDate) {
      setEndDateTime(bookingContext.booking.endDate);
    }
  }, []);

  useEffect(() => {
    validateDates();
  }, [startDateTime, endDateTime]);

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

  const getPfInfo = async () => {
    const res = await sendRequest({
      url: `/retrievePf/${pfId}/${userAddress?.latitude}/${userAddress?.longitude}/${userInfo?.userid}`,
      method: 'get',
    });
    console.log('stat', res.data);
    if (res.status == 1) {
      setPfInfo(res.data[0]);
    }
  };

  useEffect(() => {
    // setAcceptedPet({
    //   ...acceptedPet,
    //   accept_dog: pfInfo?.accept_dog || false,
    //   accept_cat: pfInfo?.accept_cat || false,
    //   accept_other: pfInfo?.accept_other || false,
    // });
    bookingContext?.setAcceptedPet({
      ...bookingContext.acceptedPet,
      accept_dog: pfInfo?.accept_dog || false,
      accept_cat: pfInfo?.accept_cat || false,
      accept_other: pfInfo?.accept_other || false,
    });
  }, [pfInfo]);

  const bookmarkPf = async () => {
    const body = {
      userId: userInfo?.userid,
      pfId: pfInfo?.user_id,
      bookmarked: pfInfo?.bookmark,
    };
    const res = await sendRequest({
      url: `/bookmarkPf`,
      method: 'post',
      body,
    });
    console.log('status', res);
    if (res.status == 1) {
      await getPfInfo();
    }
  };

  useEffect(() => {
    getPfInfo().catch(e => console.log('error retrieve pf', e));
  }, [userInfo, pfId, userAddress]);

  useEffect(() => {
    if (userInfo) {
      const selectedAddress = userInfo.useraddress.find(
        data => data.owner_flag == true,
      );
      setUserAddress(selectedAddress);
    }
  }, [userInfo]);

  const openMaps = () => {
    const startLatLng = `${userAddress?.latitude},${userAddress?.longitude}`;
    const endLatLng = `${pfInfo?.location_lat},${pfInfo?.location_long}`;
    const label = 'Pet Friend Location';

    const url = Platform.select({
      ios: `http://maps.apple.com/?saddr=${startLatLng}&daddr=${endLatLng}`,
      android: `https://www.google.com/maps/dir/?api=1&origin=${startLatLng}&destination=${endLatLng}&travelmode=driving`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const backHandler = () => {
    navigation.navigate('navigateToFindPF' as never);
  };

  return (
    <>
      <View className="bg-primary-500 h-full">
        <View className="pt-4 pb-6 px-4">
          <TouchableOpacity
            onPress={backHandler}
            className="bg-neutral-100 w-9 h-9 rounded-2xl justify-center items-center p-6">
            <BackArrow color="neutral-800" width={16} height={16} />
          </TouchableOpacity>
        </View>

        <View className="z-30 flex h-full bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 pt-4">
          <View className="flex flex-row w-full space-y-3 px-4 items-center space-x-3">
            <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
              <ProfileIcon height={50} width={50} />
            </View>
            <View className="h-[70px] space-y-2 flex flex-col w-[290px]">
              <View className="flex flex-row justify-between">
                <Text className="font-bold text-sm text-neutral-800">
                  {pfInfo?.username}
                </Text>
                <TouchableOpacity onPress={bookmarkPf}>
                  {pfInfo?.bookmark ? <FilledLoveIcon /> : <LoveIcon />}
                </TouchableOpacity>
              </View>

              {showSelectedPet(
                pfInfo?.accept_dog,
                pfInfo?.accept_cat,
                pfInfo?.accept_other,
              )}
            </View>
          </View>
          <View className="flex flex-row px-4 py-6 space-x-3 items-center justify-center">
            <View className="flex flex-col w-[100px] items-start">
              <TouchableOpacity className="items-center justify-center align-middle flex flex-col space-y-1">
                <View className="flex flex-row items-center justify-center space-x-1">
                  <FilledStarIcon width={16} height={16} />
                  <Text className="text-neutral-800 font-semibold text-xs">
                    {pfInfo?.avg_rating} ratings
                  </Text>
                </View>
                <Text className="text-neutral-500 text-[10px] font-semibold">
                  See reviews
                </Text>
              </TouchableOpacity>
            </View>

            <View className="h-[24px] w-[1px] bg-neutral-200" />

            <View className="flex flex-col w-[100px] items-center">
              <TouchableOpacity
                onPress={openMaps}
                className="flex flex-col space-y-1 items-center justify-center">
                <View className="flex flex-row items-center justify-center space-x-1">
                  <GreenLocationIcon width={16} height={16} />
                  <Text className="text-neutral-800 font-semibold text-xs">
                    {pfInfo?.distance} Km
                  </Text>
                </View>
                <Text className="text-neutral-500 text-[10px] font-semibold">
                  See Location
                </Text>
              </TouchableOpacity>
            </View>

            <View className="h-[24px] w-[1px] bg-neutral-200" />

            <View className="flex flex-col w-[100px] items-end">
              <View className="flex flex-col space-y-1 items-center justify-center">
                <Text className="text-primary-500 font-bold text-xs">
                  IDR {pfInfo && formatPrice(pfInfo?.price_daily.toString())}
                </Text>
                <Text className="text-neutral-500 text-[10px] font-semibold">
                  per day
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full h-[2px] bg-neutral-100"></View>

          <View className="px-4 w-full pt-4">
            <Text className="text-sm font-bold text-neutral-800">Duration</Text>
            <View className="flex flex-col w-full py-2">
              <Text className="text-xs font-semibold text-neutral-800">
                From
              </Text>
              <View className="flex flex-row space-x-3">
                <View className="w-[50%]">
                  <DatePicker
                    item={{time: Number(startDateTime)}}
                    minimumDate={new Date(Date.now())}
                    // maximumDate={null}
                    onDate={date => handleDateChange(date, true)}
                  />
                </View>
                <View className="w-[50%] pr-4">
                  <TimePicker
                    item={{time: Number(startDateTime)}}
                    onTimeChange={(hours, minutes) =>
                      handleTimeChange(hours, minutes, true)
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="px-4 w-full pt-1">
            <View className="flex flex-col w-full py-2">
              <Text className="text-xs font-semibold text-neutral-800">
                Until
              </Text>
              <View className="flex flex-row space-x-3">
                <View className="w-[50%]">
                  <DatePicker
                    item={{time: Number(endDateTime)}}
                    minimumDate={startDateTime}
                    maximumDate={
                      new Date(
                        startDateTime.getTime() + 10 * 24 * 60 * 60 * 1000,
                      )
                    }
                    onDate={date => handleDateChange(date, false)}
                  />
                </View>
                <View className="w-[50%] pr-4">
                  <TimePicker
                    item={item}
                    onTimeChange={(hours, minutes) =>
                      handleTimeChange(hours, minutes, false)
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="w-full flex flex-col absolute bottom-0 pb-10 px-4">
        <TouchableOpacity
          onPress={() => setShowModal(!showModal)}
          disabled={!isValid}
          className={`w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center ${
            isValid ? 'bg-primary-500' : 'bg-neutral-300'
          }`}>
          <Text className="text-[#FFFFFF] text-base font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <SelectPetSlideModal
        visible={showModal}
        onClose={() => setShowModal(!showModal)}
        onAdd={selectedIndex}
        acceptedPet={acceptedPet}
      />
    </>
  );
};

export default Duration;

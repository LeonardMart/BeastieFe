import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, createContext, useEffect, useState} from 'react';
import {
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Duration from './page/Duration';
import PetTask from './page/PetTask';
import OrderSummary from './page/OrderSummary';
import {useHttpRequest} from '../../hooks/useHttpRequest';

interface BookingsContextType {
  booking: Bookings;
  price: Price;
  acceptedPet: acceptedPet;
  setBooking: React.Dispatch<React.SetStateAction<Bookings>>;
  setPrice: React.Dispatch<React.SetStateAction<Price>>;
  setAcceptedPet: React.Dispatch<React.SetStateAction<acceptedPet>>;
}

interface Price {
  total_days: number;
  daily_price: number;
  total_hours: number;
  hourly_price: number;
  service_price: number;
  platform_fee: number;
}

interface Bookings {
  userId: string;
  pfId: string;
  startDate: Date;
  endDate: Date;
  pets: PetInfo[];
  delivery: number;
  pf_address_id: number;
  owner_address_id: number;
  total_price: number;
}

interface PetInfo {
  id: number;
  service: Service[];
}

interface Service {
  task_id: number;
  service_name: string;
  price: string;
  count: number;
}

interface IAddress {
  id: number;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  owner_flag: boolean;
}

interface acceptedPet {
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
}


export const BookingContext = createContext<BookingsContextType | undefined>(
  undefined,
);

type BookingsProps = RouteProp<RootStackParamList, 'navigateToBookings'>;

const Bookings: FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const route = useRoute<BookingsProps>();
  const navigation = useNavigation();
  const {pfId} = route.params;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // Initialize bookings state with default values
  const convertToUTC = (date: Date): Date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  };
  const [booking, setBooking] = useState<Bookings>({
    userId: userInfo?.userid ?? '',
    pfId: pfId,
    startDate: new Date(),
    endDate: new Date(),
    pets: [],
    delivery: 0,
    pf_address_id: 0,
    owner_address_id: 0,
    total_price: 0,
  });
  const [price, setPrice] = useState<Price>({
    total_days: 0,
    daily_price: 0,
    total_hours: 0,
    hourly_price: 0,
    service_price: 0,
    platform_fee: 2000,
  });
  const [acceptedPet, setAcceptedPet] = useState<acceptedPet>({
    accept_dog: false,
    accept_cat: false,
    accept_other: false,
  });
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);

  useEffect(() => {
    console.log('dapat gk?', booking);
  }, [booking]);

  const createOrder = async () => {
    const body = {
      booking,
      price
    };
    const res = await sendRequest({
      url: `/createOrder`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      navigation.navigate('navigateToHome' as never);
    }
    console.log('res', res);
  };

  

  return (
    <BookingContext.Provider value={{booking, setBooking, price, setPrice, acceptedPet, setAcceptedPet}}>
      <View className="h-full bg-[#FFFFFF] w-full ">
        {selectedIndex == 0 && (
          <Duration
            selectedIndex={() => setSelectedIndex(selectedIndex + 1)}
            pfId={pfId}
            acceptedPet={acceptedPet}
          />
        )}
        {selectedIndex == 1 && (
          <PetTask
            backPage={() => setSelectedIndex(selectedIndex - 1)}
            nextPage={() => setSelectedIndex(selectedIndex + 1)}
            pfId={pfId}
            acceptedPet={acceptedPet}
          />
        )}
        {selectedIndex == 2 && (
          <OrderSummary
            backPage={() => setSelectedIndex(selectedIndex - 1)}
            nextPage={() => setSelectedIndex(selectedIndex + 1)}
            pfId={pfId}
            onOrder={createOrder}
          />
        )}
      </View>
    </BookingContext.Provider>
    // <View className="bg-[#FFFFFF] h-full">
    //   <TouchableOpacity onPress={openMaps}>
    //     <Text className="bg-red-500">bookings</Text>
    //   </TouchableOpacity>
    // </View>
  );
};
export default Bookings;

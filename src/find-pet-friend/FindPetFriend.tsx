import {FC, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import TimePicker from '../../component/time-picker/TimePicker';
import ProfileIcon from '../../icon/profile-icon/profile-icon';
import FilledStarIcon from '../../icon/star-icon/filled-star-icon';
import DogTypeIcon from '../../icon/type/dog-icon';
import CatTypeIcon from '../../icon/type/cat-icon';
import OtherTypeIcon from '../../icon/type/other-icon';
import BackArrow from '../../icon/back-arrow/back-arrow';
import {SearchBar} from '../../component/search-bar/SearchBar';
import SearchIcon from '../../icon/search-icon/search-icon';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useHttpRequest} from '../../hooks/useHttpRequest';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface INavigate {
  navigation: any;
}

interface Location {
  id: number;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

interface petFriend {
  user_id: string;
  username: string;
  price_hourly: number;
  price_daily: number;
  detail_address: string;
  distance: number;
  accept_dog: boolean;
  accept_cat: boolean;
  accept_other: boolean;
  avg_rating: number;
  review_count: number;
}

const FindPetFriend: FC<INavigate> = ({navigation}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  // const navigation = useNavigation();
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [address, setAddress] = useState<Location>({
    id: 0,
    label: '',
    detailAddress: '',
    latitude: 0,
    longitude: 0,
  });
  const [data, setData] = useState<petFriend[]>([]);

  useEffect(() => {
    const selectedAddress: Location | undefined = userInfo?.useraddress.find(
      data => data.owner_flag == true,
    );
    if (selectedAddress) {
      setAddress(selectedAddress);
    }
  }, [userInfo]);

  const handleTimeChange = (hours: number, minutes: number) => {
    setSelectedHours(hours);
    setSelectedMinutes(minutes);
    console.log('Selected time:', {hours, minutes});
  };

  const item = {
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

  const getData = async () => {
    const body = {
      userId: userInfo?.userid,
      userLat: address.latitude,
      userLong: address.longitude,
      searchKeyword
    };
    const res = await sendRequest({
      url: `/order`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      setData(res.data);
    }
  };


  useEffect(() => {
    getData().catch(e => console.log('unable to retrieve pet friend: ', e));
  }, [address, searchKeyword]);

  const showSelectedPet = (
    dog: boolean | undefined,
    cat: boolean | undefined,
    other: boolean | undefined,
  ) => {
    return (
      <View className="flex flex-row space-x-1.5">
        {dog && (
          <View className="flex flex-row bg-[#FFFFFF] border-[1px] border-neutral-200 items-center justify-center rounded-[10px] px-1.5 py-1 space-x-2">
            <View className="p-1 bg-primary-50 items-center justify-center  rounded-lg">
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
            <View className="p-1 bg-red-50 items-center justify-center  rounded-lg">
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

  const backHandler = () => {
    navigation.navigate('navigateToHome' as never);
  };

  const changeAddressHandler = () => {
    navigation.navigate('navigateToAddress', {pageFrom: 'FindPetFriend'});
  };

  const selectPfHandler = (pfId: string) => {
    navigation.navigate('navigateToBookings', {pfId: pfId});
  };

  const searchHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setSearchKeyword(value);
    console.log('tes', value);
  };
  return (
    <View className="bg-[#FFFFFF] h-full">
      <View className="p-4 w-full border-b-[1px] border-neutral-200 items-center flex flex-col space-y-3">
        <View className="bg-neutral-100 rounded-[18px] space-x-3 px-3 py-2 items-center flex flex-row">
          <TouchableOpacity
            onPress={backHandler}
            className="px-1.5 py-1 items-center">
            <BackArrow color="neutral-800" />
          </TouchableOpacity>

          <View className="flex flex-col space-y-0.5 justify-center">
            <Text className="text-xs font-bold text-neutral-800">
              {address.label}
            </Text>
            <Text
              numberOfLines={1}
              className="w-[240px] text-neutral-500 text-xs">
              {address.detailAddress}
            </Text>
          </View>
          <TouchableOpacity
            onPress={changeAddressHandler}
            className="px-3 py-1.5 bg-[#FFFFFF] rounded-xl border-neutral-200 border-[1px] items-center">
            <Text className="text-xs font-semibold text-neutral-800">
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <View className="px-3 items-center">
          <SearchBar
            placeHolder="Search pet friend..."
            name="search"
            onChange={searchHandler}
            value={searchKeyword}
            onClear={() => setSearchKeyword('')}
          />
        </View>
      </View>
      <ScrollView>
        {data.map(data => {
          return (
            <TouchableOpacity
              key={data.user_id}
              onPress={() => selectPfHandler(data.user_id)}
              className="flex flex-col w-full border-b-[1px] border-neutral-200 p-4 space-y-2">
              <View className="flex flex-row space-x-6">
                <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
                  <ProfileIcon height={50} width={50} />
                </View>
                <View className="space-y-2 flex flex-col ">
                  <Text className="font-bold text-sm text-neutral-800">
                    {data.username}
                  </Text>
                  {data.avg_rating ? (
                    <View className="flex flex-row items-center space-x-1">
                      <View className="flex flex-row items-center space-x-1">
                        <FilledStarIcon />
                        <Text className="text-xs font-semibold text-neutral-500">
                          {data.avg_rating}
                        </Text>
                      </View>
                      <View className="h-[3px] w-[3px] rounded-full bg-neutral-500"></View>
                      <Text className="text-xs text-neutral-500">
                        {data.review_count} reviews
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-xs text-neutral-500">
                      No review yet
                    </Text>
                  )}

                  <Text className="text-xs text-neutral-500">
                    {data.distance} Km
                  </Text>
                  {showSelectedPet(
                    data.accept_dog,
                    data.accept_cat,
                    data.accept_other,
                  )}
                </View>
              </View>
              <View className="flex flex-row w-full justify-end space-x-1.5 items-center">
                <Text className="text-primary-500 text-sm font-bold">
                  IDR {formatPrice(data.price_daily.toString())}
                </Text>
                <Text className="text-neutral-500 text-xs">/day</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FindPetFriend;

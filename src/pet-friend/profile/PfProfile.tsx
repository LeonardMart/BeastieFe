import {FC, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import NextArrow from '../../../icon/next-arrow/next-arrow';
import LocationIcon from '../../../icon/location-icon/location';
import LoveIcon from '../../../icon/love/love-icon';
import LogoutIcon from '../../../icon/logout-icon/logout-icon';
import {RootState} from '../../../store/store';
import {
  resetPetCareState,
  savePetCareInfo,
} from '../../../store/pet-care/action';
import OngoingOrderIcon from '../../../icon/order-icon/ongoing-icon';
import NewBookingIcon from '../../../icon/order-icon/new-booking-icon';
import ToggleSwitch from 'toggle-switch-react-native';
import RoundWarning from '../../../icon/round-warning/round-warning';
import StarIcon from '../../../icon/star-icon/star-icon';
import MoneyIcon from '../../../icon/money-icon/money-icon';
import axios from 'axios';
import OtherTypeIcon from '../../../icon/type/other-icon';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import FilledStarIcon from '../../../icon/star-icon/filled-star-icon';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import {savePfOrderInfo} from '../../../store/pet-care/incoming-order/incomingOrderAction';

interface ILogin {
  navigation: any;
}

const PfProfile: FC<ILogin> = ({navigation}) => {
  const pfInfo = useSelector((state: RootState) => state.petCare?.petCareInfo);
  const orderInfo = useSelector(
    (state: RootState) => state.pfOrder.pfOrderInfo,
  );
  const pfUrl = 'http://10.0.2.2:4000';
  const Base = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest: getRequest} = useHttpRequest(Base);
  const dispatch = useDispatch();
  const [status, setStatus] = useState<boolean>(pfInfo?.is_active ?? false);

  const backHandler = () => {
    navigation.navigate('navigateToProfile');
  };

  const logoutHandler = () => {
    navigation.navigate('navigateToProfile');
    dispatch(resetPetCareState());
  };

  const ReviewsHandler = () =>{
    navigation.navigate('navigateToPfReviews');
  }

  const servicePriceHandler = () => {
    navigation.navigate('navigateToPfService');
  };

  const pfAddressHandler = () => {
    navigation.navigate('navigateToPfAddress');
  };

  const updateStatus = async () => {
    const body = {
      userId: pfInfo?.user_id,
      isActive: status,
    };
    try {
      const res = await axios.post(`${pfUrl}/authPf/updateStatus`, body);
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
        // navigation.navigate('navigateToPfProfile');
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
  };

  const getOrderList = async () => {
    const res = await getRequest({
      url: `/retrievePfOrder/${pfInfo?.user_id}`,
      method: 'get',
    });
    if (res.status == 1) {
      console.log("res",res.data)
      dispatch(savePfOrderInfo(res.data));
    }
  };
  useEffect(() => {
    getOrderList().catch(e => console.log('error retrieve order history', e));
  }, [pfInfo]);

  useEffect(() => {
    console.log('orderinfo', orderInfo);
  }, [orderInfo]);

  useEffect(() => {
    const fetchData = async () => {
      await updateStatus();
    };

    fetchData();
  }, [status]);

  const incomingOrdersNavigate = ()=>{
    navigation.navigate("navigateToIncomingOrders")
  }

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
  return (
    <View className="bg-primary-500 h-full pt-[88px]">
      {/* <View className="pt-4 pb-6 px-4">
        <TouchableOpacity
          onPress={backHandler}
          className="bg-neutral-100 w-9 h-9 rounded-2xl justify-center items-center p-6">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
      </View> */}

      <View className="flex h-full bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl pt-4">
        <View className="flex flex-row w-full space-y-3 px-4  space-x-3">
          <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
            <ProfileIcon height={50} width={50} />
          </View>
          <View className="space-y-1">
            <Text className="font-semibold text-[10px] text-primary-500">
              Pet Friend Account
            </Text>
            <Text className="font-bold text-sm text-neutral-800">
              {pfInfo?.username}
            </Text>
            <View className="flex flex-row items-center space-x-1">
              <FilledStarIcon />
              <Text className="text-xs text-neutral-500">5.0</Text>
            </View>

            {showSelectedPet(
              pfInfo?.accept_dog,
              pfInfo?.accept_cat,
              pfInfo?.accept_other,
            )}
          </View>
        </View>

        <View className="px-4 pt-6">
          <View className="w-full ">
            <View className="w-full border-t-[1px] border-x-[1px] border-neutral-200 rounded-t-2xl px-3 py-3 flex flex-row space-x-6 justify-center">
              <View className="w-full flex flex-col space-y-2.5">
                <View className="flex flex-row justify-between">
                  <Text className="font-semibold text-xs text-neutral-500">
                    Incoming Bookings
                  </Text>
                  <TouchableOpacity onPress={incomingOrdersNavigate}>
                    <Text className="font-semibold text-xs text-primary-500">
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="w-full flex flex-row space-x-3">
                  <View className="flex flex-col w-[170px] bg-yellow-50 rounded-xl p-2.5 space-y-1.5">
                    <OngoingOrderIcon
                      color="yellow-500"
                      width={20}
                      height={20}
                    />
                    <Text className="text-xs text-neutral-800">
                      1 ongoing booking
                    </Text>
                  </View>
                  <View className="flex flex-col w-[170px] bg-primary-50 rounded-xl p-2.5 space-y-1.5">
                    <NewBookingIcon
                      color="primary-500"
                      width={20}
                      height={20}
                    />
                    <Text className="text-xs text-neutral-800">
                      1 new booking
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex flex-row border-[1px] border-neutral-200 bg-neutral-100 items-center justify-between px-3 py-4 rounded-b-2xl">
              <View className="flex flex-col space-y-1">
                <Text className="text-xs font-semibold text-neutral-800">
                  My Balance
                </Text>
                <Text className="text-[10px] font-semibold text-neutral-500">
                  1 completed bookings
                </Text>
              </View>
              <View>
                <Text className="text-sm text-primary-500 font-bold">
                  IDR 125.000
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 pt-4">
          <TouchableOpacity onPress={ReviewsHandler} className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <StarIcon color="neutral-800" width={20} height={20} />
              <Text className="text-neutral-800 font-semibold text-sm">
                Reviews
              </Text>
            </View>

            <TouchableOpacity className="p-1.5">
              <NextArrow color="neutral-500" />
            </TouchableOpacity>
          </TouchableOpacity>
          <View className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <RoundWarning color="neutral-800" width={18} height={20} />
              <Text className="text-neutral-800 font-semibold text-sm">
                Pet Friend Status
              </Text>
            </View>

            <View className="flex flex-row space-x-1.5 items-center">
              <View className="bg-neutral-100 px-1.5 rounded-lg py-1.5">
                <Text className="text-neutral-500 text-[10px] font-semibold">
                  {status ? 'Active' : 'Inactive'}
                </Text>
              </View>
              <ToggleSwitch
                isOn={status}
                onColor="#4871F7"
                offColor="#CBD5E1"
                size="medium"
                onToggle={() => setStatus(!status)}
              />
            </View>
          </View>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-primary-500 font-semibold text-xs">
            Account Setting
          </Text>
          <TouchableOpacity
            onPress={servicePriceHandler}
            className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <MoneyIcon color="neutral-800" width={18} height={20} />
              <Text className="text-neutral-800 font-semibold text-sm">
                Service & Pricelist
              </Text>
            </View>

            <TouchableOpacity className="p-1.5">
              <NextArrow color="neutral-500" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pfAddressHandler}
            className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <LocationIcon color="neutral-800" w={18} h={20} />
              <Text className="text-neutral-800 font-semibold text-sm">
                Pet Care Address
              </Text>
            </View>

            <TouchableOpacity className="p-1.5">
              <NextArrow color="neutral-500" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-primary-500 font-semibold text-xs">Other</Text>
          <TouchableOpacity
            onPress={logoutHandler}
            className="flex flex-row items-center justify-between py-3 border-b-[1px] border-neutral-200">
            <View className="flex flex-row space-x-3 items-center">
              <LogoutIcon color="red-500" />
              <Text className="text-red-500 font-semibold text-sm">Logout</Text>
            </View>

            <TouchableOpacity className="p-1.5">
              <NextArrow color="red-500" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PfProfile;

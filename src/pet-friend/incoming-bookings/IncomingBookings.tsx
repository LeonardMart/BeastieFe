import {FC, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import DogTypeIcon from '../../../icon/type/dog-icon';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import CalenderIcon from '../../../icon/calender/calender';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {useNavigation} from '@react-navigation/native';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import {savePfOrderInfo} from '../../../store/pet-care/incoming-order/incomingOrderAction';

interface INavigation {
  navigation: any;
}

const IncomingBookings: FC<INavigation> = ({navigation}) => {
  const orderInfo = useSelector(
    (state: RootState) => state.pfOrder.pfOrderInfo,
  );
  const pfInfo = useSelector((state: RootState) => state.petCare?.petCareInfo);
  const Base = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest: getRequest} = useHttpRequest(Base);
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const formatDate = (date: Date | undefined) => {
    if (date) {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
      }).format(date);
    }
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const detailOrderNavigate = (orderId: number) => {
    console.log('orderid', orderId);
    navigation.navigate('navigateToDetailIncomingOrders', {orderId: orderId});
  };

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
  useEffect(() => {
    getOrderList().catch(e => console.log('error retrieve order history', e));
  }, [pfInfo]);
  return (
    <View className="h-full bg-[#FFFFFF]">
      <View className="flex flex-row w-full border-b-[1px] bg-[#FFFFFF] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          className="items-center w-6 h-6 justify-center"
          onPress={() => navigation.goBack()}>
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
        <Text className="font-semibold text-neutral-800 text-base">
          Incoming Bookings
        </Text>
      </View>
      <ScrollView>
        <View className="flex flex-col px-4 space-y-3 items-center py-4">
          {orderInfo?.map(data => {
            return (
              <TouchableOpacity
                key={data.order_id}
                onPress={() => detailOrderNavigate(data.order_id)}
                className="border-[1px] w-[374px] rounded-2xl  border-neutral-200 ">
                <View className="py-[18px] px-3 flex flex-row space-x-3">
                  <View className="bg-neutral-100 w-9 h-9 items-center rounded-[14px] p-3.5 justify-center">
                    <ProfileIcon />
                  </View>
                  <View>
                    <Text className="font-bold text-neutral-800 text-sm">
                      {data.pet_owner}
                    </Text>
                    <Text className="font-semibold text-[10px] text-neutral-500">
                      {data.pets.length} Pets
                    </Text>
                  </View>
                </View>

                <View className="border-t-[1px] border-neutral-200  rounded-b-2xl py-3 px-3 space-y-3 justify-between">
                  <View className=" flex flex-row items-center space-x-1.5">
                    {data.pets.map(pet => {
                      return (
                        <View
                          key={pet.pet_id}
                          className="border-[1px] flex flex-row rounded-[10px] border-neutral-200 items-center justify-center space-x-2 py-1 px-1.5">
                          {pet.type == 'Dog' && (
                            <View className="w-5 h-5 bg-primary-50 items-center justify-center  rounded-[14px]">
                              <DogTypeIcon width={12} height={11} />
                            </View>
                          )}
                          {pet.type == 'Cat' && (
                            <View className="w-5 h-5 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
                              <CatTypeIcon width={12} height={11} />
                            </View>
                          )}
                          {pet.type == 'Other' && (
                            <View className="w-5 h-5 bg-red-50 items-center justify-center  rounded-[14px]">
                              <OtherTypeIcon width={12} height={11} />
                            </View>
                          )}
                          <Text className="font-semibold text-xs text-neutral-500">
                            {pet.pet_name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View className="flex flex-row items-center space-x-1.5">
                    <CalenderIcon />
                    <View className="flex flex-row items-center space-x-1">
                      <Text className="font-semibold text-xs text-neutral-500">
                        {formatDate(new Date(data.start_date))}
                      </Text>
                      <View className="h-1 w-1 rounded-full border-[1px] border-neutral-500  bg-neutral-500"></View>
                      <Text className="font-semibold text-xs text-neutral-500">
                        {formatDate(new Date(data.end_date))}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row justify-between items-center">
                    {data.status == 'Complete' && (
                      <View className="bg-success-50 py-1 px-2 rounded-lg">
                        <Text className="text-success-500 text-[10px] font-bold">
                          {data.status}
                        </Text>
                      </View>
                    )}
                    {data.status == 'Ongoing' && (
                      <View className="bg-yellow-50 py-1 px-2 rounded-lg">
                        <Text className="text-yellow-500 text-[10px] font-bold">
                          {data.status}
                        </Text>
                      </View>
                    )}

                    {(data.is_canceled_pf == true ||
                      data.is_canceled_owner == true || data.status == 'Canceled by Sistem') && (
                      <View className="bg-red-50 py-1 px-2 rounded-lg">
                        <Text className="text-red-500 text-[10px] font-bold">
                          Canceled
                        </Text>
                      </View>
                    )}

                    <Text className="text-primary-500 font-bold text-sm">
                      IDR {formatPrice(data.price.toString())}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default IncomingBookings;

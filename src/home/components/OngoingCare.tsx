import {FC, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DogTypeIcon from '../../../icon/type/dog-icon';
import CatTypeIcon from '../../../icon/type/cat-icon';
import CalenderIcon from '../../../icon/calender/calender';
import OtherTypeIcon from '../../../icon/type/other-icon';
import MaleIcon from '../../../icon/gender-icon/male-icon';
import FemaleIcon from '../../../icon/gender-icon/female-icon';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {OwnerHistory} from '../../../store/types';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import {saveUserOrderInfo} from '../../../store/pet-owner/order/orderAction';

interface petInfo {
  petId: number;
  name: string;
  petType: number;
  breed: string;
  gender: string;
}

interface IOrder {
  userId: number;
  name: string;
  pets: petInfo[];
  startDate: string;
  endDate: string;
  orderStatus: string;
}

interface IOngoingOrder {
  ongoingOrder: IOrder[];
}

const OngoingCare: FC<IOngoingOrder> = ({ongoingOrder}) => {
  const [dataOrder, setDataOrder] = useState<OwnerHistory[]>([]);

  const orderInfo = useSelector(
    (state: RootState) => state.userOrder.orderInfo,
  );

  useEffect(() => {
    const ongoingOrder = orderInfo?.filter(item => item.status == 'Ongoing');
    if (ongoingOrder) setDataOrder(ongoingOrder);
  }, [orderInfo]);

  const formatDate = (date: Date | undefined) => {
    if (date) {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
      }).format(date);
    }
  };
  return (
    <>
      {dataOrder.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row px-4 space-x-3 items-center">
            {dataOrder?.map(data => {
              return (
                <View
                  key={data.order_id}
                  className="border-[1px] w-[374px] rounded-2xl border-neutral-200 ">
                  <View className="py-[18px] px-3 flex flex-row space-x-3">
                    <View className="bg-neutral-100 w-9 h-9 items-center rounded-[14px] p-3.5 justify-center">
                      <ProfileIcon />
                    </View>
                    <View>
                      <Text className="font-semibold text-[10px] text-neutral-500">
                        Pet Friend
                      </Text>
                      <Text className="font-bold text-neutral-800 text-sm">
                        {data.pet_friend}
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
                    <View className="flex flex-row">
                      <View className="bg-yellow-50 py-1 px-2 rounded-lg">
                        <Text className="text-yellow-500 text-[10px] font-bold">
                          Ongoing
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex flex-col items-center w-full pt-4 space-y-1.5">
          <Text className='font-semibold text-neutral-800 text-sm'>There are no ongoing care at the moment</Text>
          <Text className='text-neutral-500 text-sm'>Start finding pet friends to take care of your pets.</Text>
        </View>
      )}
    </>
  );
};

export default OngoingCare;

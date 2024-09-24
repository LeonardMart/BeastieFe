import {FC, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, TextInput, View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {OwnerHistory} from '../../../store/types';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import { saveUserOrderInfo } from '../../../store/pet-owner/order/orderAction';

interface IReview {
  rating: number;
  description: string;
}

interface Reviews {
  orderId: number;
}

const Reviews: FC<Reviews> = ({orderId}) => {
  const orderInfo = useSelector(
    (state: RootState) => state.userOrder.orderInfo,
  );
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [review, setReview] = useState<IReview>({
    rating: 0,
    description: '',
  });
  const dispatch = useDispatch();
  const [isValidReview, setIsValidReview] = useState<boolean>(false);
  const [data, setData] = useState<OwnerHistory>();
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);
  

  useEffect(() => {
    const valid = review.rating != 0 && review.description != '';
    console.log('valid', valid);
    setIsValidReview(valid);
  }, [review]);

  useEffect(() => {
    const selectedOrder = orderInfo?.find(item => item.order_id == orderId);
    if (selectedOrder) {
      setData(selectedOrder);
    }
  }, [orderId]);

  const getOrderList = async () => {
    const res = await sendRequest({
      url: `/retrieveOwnerOrder/${userInfo?.userid}`,
      method: 'get',
    });
    if (res.status == 1) {
      dispatch(saveUserOrderInfo(res.data));
    }
  };

  const createReview = async () => {
    const body = {
      orderId,
      pfId: data?.pet_friend_id,
      userId: data?.pet_owner_id,
      review,
    };
    const res = await sendRequest({
      url: `/createReview`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      getOrderList();
    }
  };



  return (
    <View className="flex flex-col px-4 py-6 items-center space-y-6">
      <View className="flex flex-col items-center space-y-4">
        <View className="items-center space-y-1">
          <Text className="font-semibold text-sm text-neutral-800">
            Rate Your Pet Friend
          </Text>
          <Text className="text-center text-xs text-neutral-500">
            Review and send feedbacks for your Pet Friend to improve their work
            quality or just appreciate their work.
          </Text>
        </View>
        <StarRating
          onChange={a => setReview({...review, rating: a})}
          rating={review.rating}
          maxStars={5}
          enableHalfStar={false}
          color="#F9B42D"
          emptyColor="#E2E8F0"
          starSize={40}
        />
      </View>

      <View className="flex flex-col w-full space-y-0.5">
        <Text className="font-semibold text-xs text-neutral-800">
          Message Your Pet Friend?
        </Text>
        <View className="bg-neutral-100 rounded-[14px] w-full h-[100px] py-2.5 px-3">
          <TextInput
            className="h-full w-full"
            placeholder="Write message..."
            textAlignVertical="top"
            multiline={true}
            value={review.description}
            onChangeText={a => setReview({...review, description: a})}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={createReview}
        disabled={!isValidReview}
        className={`${
          isValidReview ? 'bg-primary-500' : 'bg-neutral-300'
        } w-full  items-center py-3 rounded-2xl`}>
        <Text className="text-sm font-bold text-[#FFFFFF]">Send Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;

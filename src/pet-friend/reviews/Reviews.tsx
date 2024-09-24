import {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import {ScrollView} from 'react-native';
import ProfileIcon from '../../../icon/profile-icon/profile-icon';
import StarRating from 'react-native-star-rating-widget';
import {useHttpRequest} from '../../../hooks/useHttpRequest';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

interface INavigate {
  navigation: any;
}

interface IReview {
  id: number;
  rating: number;
  description: string;
  created_date: Date;
  pet_owner: string;
}

const Reviews: FC<INavigate> = ({navigation}) => {
  const [data, setData] = useState<IReview[]>([]);
  const baseUrl = `http://10.0.2.2:4000/authPf`;
  const {sendRequest: getRequest} = useHttpRequest(baseUrl);
  const pfInfo = useSelector((state: RootState) => state.petCare?.petCareInfo);

  const getReview = async () => {
    const res = await getRequest({
      url: `/getPfReviews/${pfInfo?.user_id}`,
      method: 'get',
    });
    console.log();
    if (res.status == 1) {
      console.log('review data', res.data);
      setData(res.data);
    }
  };

  const convertDate = (rawDate: Date) => {
    const date = new Date(rawDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const backHandler = () => {
    navigation.navigate('navigateToPfProfile');
  };

  useEffect(() => {
    getReview().catch(e => console.log('error', e));
  }, []);
  return (
    <View className="h-full bg-[#FFFFFF]">
      <View className="flex flex-row w-full border-b-[1px] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          onPress={backHandler}
          className="items-center w-6 h-6 justify-center">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
        <Text className="font-semibold text-neutral-800 text-base">
          Reviews
        </Text>
      </View>
      <ScrollView>
        {data.map(item => {
          return (
            <View
              key={item.id}
              className="p-4 border-b-[1px] border-neutral-200">
              <View className="flex flex-row w-full space-y-3 items-start space-x-3">
                <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
                  <ProfileIcon height={50} width={50} />
                </View>
                <View className="h-fit space-y-2 flex flex-col w-[290px]">
                  <View className="flex flex-row justify-between">
                    <Text className="font-bold text-sm text-neutral-800">
                      {item.pet_owner}
                    </Text>
                    <Text>{convertDate(item.created_date)}</Text>
                  </View>
                  <StarRating
                    onChange={() => {}}
                    rating={item.rating}
                    maxStars={5}
                    enableHalfStar={false}
                    color="#F9B42D"
                    emptyColor="#E2E8F0"
                    starSize={20}
                    starStyle={{}}
                  />
                  <Text>{item.description}</Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* <View className="p-4 border-b-[1px] border-neutral-200">
          <View className="flex flex-row w-full space-y-3 items-start space-x-3">
            <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
              <ProfileIcon height={50} width={50} />
            </View>
            <View className="h-fit space-y-2 flex flex-col w-[290px]">
              <View className="flex flex-row justify-between">
                <Text className="font-bold text-sm text-neutral-800">
                  leonard
                </Text>
                <Text>26/10/2020</Text>
              </View>
              <StarRating
                onChange={() => {}}
                rating={4}
                maxStars={5}
                enableHalfStar={false}
                color="#F9B42D"
                emptyColor="#E2E8F0"
                starSize={20}
                starStyle={{}}
              />
              <Text>
                asdasdas asdasdas asd asd asd asd asd asdasd asd asd asd asdasd
                asd asd asd asdasd asd asd as dasd asd asd asd ad ada
              </Text>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Reviews;

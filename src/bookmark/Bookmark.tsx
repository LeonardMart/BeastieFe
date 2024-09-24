import React, {FC, useEffect, useState} from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from '../../component/search-bar/SearchBar';
import DogTypeIcon from '../../icon/type/dog-icon';
import CatTypeIcon from '../../icon/type/cat-icon';
import OtherTypeIcon from '../../icon/type/other-icon';
import FilledStarIcon from '../../icon/star-icon/filled-star-icon';
import ProfileIcon from '../../icon/profile-icon/profile-icon';
import {useHttpRequest} from '../../hooks/useHttpRequest';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {saveUserBookmarkInfo} from '../../store/pet-owner/bookmark/bookmarkAction';
import FilledLoveIcon from '../../icon/love-icon/filled-love-icon';

interface INavigation {
  navigation: any;
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

interface Location {
  id: number;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

const Bookmark: FC<INavigation> = ({navigation}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const bookmarkInfo = useSelector(
    (state: RootState) => state.userBookmarkk.bookmarkInfo,
  );
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [data, setData] = useState<petFriend[]>([]);
  const baseUrl = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest} = useHttpRequest(baseUrl);

  const searchHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text;
    setSearchKeyword(value);
    console.log('tes', value);
  };

  const getData = async () => {
    const body = {
      userId: userInfo?.userid,
      searchKeyword,
    };
    const res = await sendRequest({
      url: `/getBookmarkPf`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      dispatch(saveUserBookmarkInfo(res.data));
    }
  };

  useEffect(() => {
    getData().catch(e => console.log('unable to retrieve pet friend: ', e));
  }, [searchKeyword]);

  useEffect(() => {
    console.log('bookmark', bookmarkInfo);
  }, [bookmarkInfo]);

  const selectPfHandler = (pfId: string) => {
    navigation.navigate('navigateToBookings', {pfId: pfId});
  };

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
    <View className="bg-[#FFFFFF] h-full">
      <View className="p-4 w-full border-b-[1px] border-neutral-200  flex flex-col space-y-3">
        <View className="flex flex-row w-fullbg-[#FFFFFF] items-center space-x-3">
          <Text className="font-semibold text-neutral-800 text-lg">
            Pet Friends
          </Text>
        </View>
        <View className="items-center">
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
        {bookmarkInfo?.map(item => {
          return (
            <TouchableOpacity
              key={item.user_id}
              onPress={() => selectPfHandler(item.user_id)}
              className="flex flex-col w-full border-b-[1px] border-neutral-200 p-4 space-y-2">
              <View className="flex flex-row space-x-6">
                <View className="bg-neutral-100 w-[70px] h-[70px] items-center justify-center rounded-3xl px-1.5 py-1.5">
                  <ProfileIcon height={50} width={50} />
                </View>
                <View className="space-y-2 flex flex-col ">
                  <View className="flex flex-row justify-between w-[280px] items-center">
                    <Text className="font-bold text-sm text-neutral-800">
                      {item.username}
                    </Text>
                    <FilledLoveIcon/>
                  </View>

                  {item.avg_rating ? (
                    <View className="flex flex-row items-center space-x-1">
                      <View className="flex flex-row items-center space-x-1">
                        <FilledStarIcon />
                        <Text className="text-xs font-semibold text-neutral-500">
                          {item.avg_rating}
                        </Text>
                      </View>
                      <View className="h-[3px] w-[3px] rounded-full bg-neutral-500"></View>
                      <Text className="text-xs text-neutral-500">
                        {item.review_count} reviews
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-xs text-neutral-500">
                      No review yet
                    </Text>
                  )}

                  {/* <Text className="text-xs text-neutral-500">0 Km</Text> */}
                  {showSelectedPet(
                    item.accept_dog,
                    item.accept_cat,
                    item.accept_other,
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Bookmark;

import {FC, createContext, useContext, useEffect, useState} from 'react';
import MyServices from './page/MyServices';
import {Text, TouchableOpacity, View} from 'react-native';
import MyPricelist from './page/MyPricelist';
import BackArrow from '../../icon/back-arrow/back-arrow';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import PfAddress from './page/PfAddress';
import SetAddressPf from './component/SetAddressPf';
import axios from 'axios';
// import {savePetCareInfo} from '../../store/pet-care/action';
import {saveUserInfo} from '../../store/pet-owner/action';

interface RegisterPFContextType {
  //   userId: string;
  pfAddressId: number;
  service: IService;
  priceList: IPricelist;
  setService: React.Dispatch<React.SetStateAction<IService>>;
  setPriceList: React.Dispatch<React.SetStateAction<IPricelist>>;
  setPfAddressId: React.Dispatch<React.SetStateAction<number>>;
}

interface IPricelist {
  userId: string;
  hourlyPrice: string;
  dailyPrice: string;
  additionalTask: IAdditionaltask[];
}

interface IAdditionaltask {
  userId: string;
  taskService: string;
  price: string;
  acceptDog: boolean;
  acceptCat: boolean;
  acceptOther: boolean;
}

interface IService {
  userId: string;
  acceptDog: boolean;
  acceptCat: boolean;
  acceptOther: boolean;
}

export const RegisterPFContext = createContext<
  RegisterPFContextType | undefined
>(undefined);
const BePetFriend: FC = () => {
  const registerPfUrl = 'http://10.0.2.2:4000';
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [pfAddressId, setPfAddressId] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showSetAddress, setShowSetAddress] = useState<boolean>(false);
  const navigation = useNavigation();
  const [service, setService] = useState<IService>({
    userId: userInfo?.userid ?? '',
    acceptDog: false,
    acceptCat: false,
    acceptOther: false,
  });
  const [priceList, setPriceList] = useState<IPricelist>({
    userId: userInfo?.userid ?? '',
    hourlyPrice: '',
    dailyPrice: '',
    additionalTask: [],
  });
  const url = `http://10.0.2.2:4000`;
  const [additionalTask, setAdditionalTask] = useState<IAdditionaltask[]>([]);
  const dispatch = useDispatch();
  const backHandler = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (selectedIndex == 0) {
      navigation.navigate('navigateToProfile' as never);
    }
  };

  const registerPfHandler = async () => {
    const body = {
      userId: userInfo?.userid,
      pfAddressId,
      service,
      priceList,
    };
    console.log(body);
    try {
      const res = await axios.post(
        `${registerPfUrl}/authregisterpf/register`,
        body,
      );
      if (res.status == 200) {
        await retriveData()
        navigation.navigate('navigateToProfile' as never);
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const retriveData = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(`${registerPfUrl}/authregisterpf/retrieveById/${userInfo?.userid}`, {signal: abortController.signal});
      if (res.status == 200) {
        const result = res.data.data[0];
        // const trydata: IUserData[] = res.data;
        console.log('asas', result);
        dispatch(saveUserInfo(result));

        // console.log("dapat gk ya ges",res.status)
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
  };

  //   useEffect(() => {
  //     console.log('tes be pf', service);
  //   }, [service, pfAddressId]);

  //   useEffect(() => {
  //     console.log('tes be pf', priceList);
  //   }, [priceList, pfAddressId]);

  useEffect(() => {
    console.log('tes be pf', pfAddressId);
  }, [pfAddressId]);
  return (
    <RegisterPFContext.Provider
      value={{
        service,
        setService,
        priceList,
        setPriceList,
        pfAddressId,
        setPfAddressId,
      }}>
      <View className="h-full bg-[#FFFFFF]">
        {/* this is top navbar */}
        {!showSetAddress ? (
          <>
            <View className="flex flex-row w-full border-b-[1px] bg-[#FFFFFF] border-neutral-200 py-4 px-4 items-center space-x-3">
              <TouchableOpacity onPress={backHandler}>
                <BackArrow color="neutral-800" width={16} height={16} />
              </TouchableOpacity>
              <Text className="font-semibold text-neutral-800 text-base">
                Be a Pet Friend
              </Text>
            </View>

            {selectedIndex == 0 && (
              <MyServices
                selectedIndex={() => setSelectedIndex(selectedIndex + 1)}
              />
            )}

            {selectedIndex == 1 && (
              <MyPricelist
                selectedIndex={() => setSelectedIndex(selectedIndex + 1)}
              />
            )}
            {selectedIndex == 2 && (
              <PfAddress
                isSetAddress={() => setShowSetAddress(!showSetAddress)}
                onFinish={registerPfHandler}
              />
            )}
          </>
        ) : (
          <SetAddressPf
            isSetAddress={() => setShowSetAddress(!showSetAddress)}
          />
        )}
      </View>
    </RegisterPFContext.Provider>
  );
};

export default BePetFriend;

import {FC, createContext, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DogTypeIcon from '../../../icon/type/dog-icon';
import ToggleSwitch from 'toggle-switch-react-native';
import CatTypeIcon from '../../../icon/type/cat-icon';
import OtherTypeIcon from '../../../icon/type/other-icon';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {RegisterPFContext} from '../BePetFriend';

interface IIndex {
  selectedIndex: () => void;
}

interface IService {
  userId: string;
  acceptDog: boolean;
  acceptCat: boolean;
  acceptOther: boolean;
}

const MyServices: FC<IIndex> = ({selectedIndex}) => {
  const registerPfContext = useContext(RegisterPFContext);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [tes, setTes] = useState<boolean>(false);
  const [service, setService] = useState<IService>({
    userId: userInfo?.userid ?? '',
    acceptDog: registerPfContext?.service.acceptDog ?? false,
    acceptCat: registerPfContext?.service.acceptCat ?? false,
    acceptOther: registerPfContext?.service.acceptOther ?? false,
  });

  const calculate = () => {
    let selected = Object.values(service).filter(val => val === true).length;
    return selected;
  };

  useEffect(() => {
    console.log('service', service);
  }, [service]);

  const addServiceHandler = () => {
    registerPfContext?.setService({...registerPfContext.service, ...service});
    selectedIndex();
  };

  return (
    <>
      <View className="w-full flex flex-col space-y-2 py-3 px-4">
        <Text className="text-lg font-bold text-neutral-800">My Services</Text>
        <Text className="leading-5 text-sm text-neutral-500">
          Set up and select which pets you are willing to take care as your
          services.
        </Text>
      </View>
      <View className="py-4 flex flex-col space-y-4 px-4">
        <View className="w-full flex flex-row items-center border-[1px] justify-between border-neutral-200 py-3 px-3 rounded-2xl">
          <View className="flex flex-row items-center space-x-3">
            <View className="w-9 h-9 bg-primary-50 items-center justify-center  rounded-[14px]">
              <DogTypeIcon width={20} height={20} />
            </View>
            <Text className="text-sm font-bold text-neutral-800">Dog</Text>
          </View>
          <ToggleSwitch
            isOn={service.acceptDog}
            onColor="#4871F7"
            offColor="#CBD5E1"
            size="medium"
            onToggle={isOn => setService({...service, acceptDog: isOn})}
          />
        </View>

        <View className="w-full flex flex-row items-center border-[1px] justify-between border-neutral-200 py-3 px-3 rounded-2xl">
          <View className="flex flex-row items-center space-x-3">
            <View className="w-9 h-9 bg-[#FFF6E5] items-center justify-center  rounded-[14px]">
              <CatTypeIcon width={20} height={20} />
            </View>
            <Text className="text-sm font-bold text-neutral-800">Cat</Text>
          </View>
          <ToggleSwitch
            isOn={service.acceptCat}
            onColor="#4871F7"
            offColor="#CBD5E1"
            size="medium"
            onToggle={isOn => setService({...service, acceptCat: isOn})}
          />
        </View>

        <View className="w-full flex flex-row items-center border-[1px] justify-between border-neutral-200 py-3 px-3 rounded-2xl">
          <View className="flex flex-row items-center space-x-3">
            <View className="w-9 h-9 bg-red-50 items-center justify-center  rounded-[14px]">
              <OtherTypeIcon width={20} height={20} />
            </View>
            <Text className="text-sm font-bold text-neutral-800">Other</Text>
          </View>
          <ToggleSwitch
            isOn={service.acceptOther}
            onColor="#4871F7"
            offColor="#CBD5E1"
            size="medium"
            onToggle={isOn => setService({...service, acceptOther: isOn})}
          />
        </View>
      </View>
      <View className="w-full flex flex-col absolute bottom-0 pb-10 px-4">
        {calculate() < 1 ? (
          <TouchableOpacity
            disabled
            onPress={addServiceHandler}
            className="bg-neutral-300 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF] text-base font-semibold">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={addServiceHandler}
            className="bg-primary-500 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF] text-base font-semibold">Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default MyServices;

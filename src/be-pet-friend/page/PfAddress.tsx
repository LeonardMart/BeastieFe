import React, {FC, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackArrow from '../../../icon/back-arrow/back-arrow';
// import { useRegister } from './RegisterContext';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import LocationIcon from '../../../icon/location-icon/location';
import EditIcon from '../../../icon/edit-icon/edit-icon';
import TrashIcon from '../../../icon/trash-icon/trash-icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import ModalDialog from '../../../component/modal-dialog/ModalDialog';
import axios from 'axios';
import {updateAddress} from '../../../store/pet-owner/action';
import {RegisterPFContext} from '../BePetFriend';

interface IIndex {
  isSetAddress: () => void;
  onFinish:()=>void
}

interface IAddress {
  userId: string;
  label: string;
  detailAddress: string;
  longitude: number;
  latitude: number;
}

const dummyData = [
  {
    label: 'home',
    detailAddress: 'jalan kenangan, bsd city',
  },
];

const PfAddress: FC<IIndex> = ({isSetAddress, onFinish}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const registerPfContext = useContext(RegisterPFContext);

  const addressUrl = 'http://10.0.2.2:4000/authaddress';
  const [address, setAddress] = useState<IAddress[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const setAddressHandler = () => {
    navigation.navigate('navigateToSetAddressPf' as never);
  };

  useEffect(() => {
    if (route.params) {
      setAddress([route.params as IAddress]); // Wrap route.params in an array
    }
  }, [route.params]);

  const removeHandler = (label: string, detail: string) => {};

  const backHanler = () => {
    navigation.navigate('navigateTo' as never);
  };

  const retrieveAddress = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(
        `${addressUrl}/retrieve/${userInfo?.userid}`,
        {
          signal: abortController.signal,
        },
      );
      if (res.status == 200) {
        dispatch(updateAddress(res.data.data));
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
    console.log('cek', userInfo?.pets);
  };

  const removeAddress = async (petId: number) => {
    try {
      const res = await axios.delete(
        `${addressUrl}/remove/${petId}/${userInfo?.userid}`,
      );
      if (res.status == 200) {
        console.log('delete success');
        await retrieveAddress();
      } else {
        throw new Error('Failed to delete pet');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const selectAddress = (id: number) => {
    registerPfContext?.setPfAddressId(id);
  };

  return (
    <>
      <ScrollView>
        <View className="px-4 pt-3 flex flex-col space-y-2">
          <Text className="text-lg font-bold text-neutral-800">
            Pet Care Address
          </Text>
          <Text className="leading-5 text-sm text-neutral-500">
            Select your pet care address location.
          </Text>
        </View>
        <View className="flex flex-col justify-between h-full pb-32">
          <View className="flex flex-col h-fit w-full py-4 space-y-4">
            {userInfo?.useraddress &&
              userInfo?.useraddress.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() => selectAddress(data.id)}
                    key={data.id}
                    className="w-full px-4">
                    <View
                      className={`w-full ${
                        registerPfContext?.pfAddressId == data.id
                          ? 'border-primary-500'
                          : 'border-neutral-200'
                      } rounded-2xl border-[1px]`}>
                      <View className="px-3 flex py-3 space-y-1">
                        <View className="flex-row gap-2 items-center">
                          <View className="w-9 h-9 bg-primary-50 rounded-[14px] items-center justify-center">
                            <LocationIcon />
                          </View>
                          <Text className="text-neutral-800 font-bold text-sm">
                            {data.label}
                          </Text>
                          {registerPfContext?.pfAddressId == data.id && (
                            <View className="bg-primary-50 px-1.5 py-0.5 rounded-[10px]">
                              <Text className="text-[10px] font-bold text-primary-500">
                                Pet Care
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-sm font-normal text-neutral-500">
                          {data.detailAddress}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
      {registerPfContext?.pfAddressId != 0 ? (
        <View className="w-full flex flex-col absolute bottom-0 px-4 bg-[#FFFFFF] pb-10">
          <TouchableOpacity
          onPress={onFinish}
            className="bg-primary-500 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF] text-base font-semibold">
              Finish
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="w-full flex flex-col absolute bottom-0 px-4 bg-[#FFFFFF] pb-10">
          <TouchableOpacity
            disabled
            className="bg-neutral-300 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF] text-base font-semibold">
              Finish
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalDialog
        visible={showModal}
        type="confirm-red"
        title="Remove Address?"
        desc="Your address will be removed."
        yesBtn="Yes, Remove"
        noBtn="No, Don't"
        onConfirm={() => {
          removeAddress(selectedId), setShowModal(!showModal);
        }}
        onCancel={() => setShowModal(!showModal)}
      />
    </>
  );
};

export default PfAddress;

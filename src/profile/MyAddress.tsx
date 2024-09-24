import React, {FC, useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackArrow from '../../icon/back-arrow/back-arrow';
// import { useRegister } from './RegisterContext';
import PlusIcon from '../../icon/plus-icon/plus-icon';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import LocationIcon from '../../icon/location-icon/location';
import EditIcon from '../../icon/edit-icon/edit-icon';
import TrashIcon from '../../icon/trash-icon/trash-icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import ModalDialog from '../../component/modal-dialog/ModalDialog';
import axios from 'axios';
import {saveUserInfo, updateAddress} from '../../store/pet-owner/action';
import MoreVertical from '../../icon/more-vertical/more-vertical';
import EditRemoveSlideModal from '../../component/slide-modal/EditRemoveSlideModal';
import {RootStackParamList} from '../../App';

interface LoginProps {
  onNext?: any;
}

interface INavigate {
  navigation: any;
}

interface IAddress {
  id: number;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  owner_flag: boolean;
}

type myAddressProps = RouteProp<RootStackParamList, 'navigateToAddress'>;

const MyAddress: FC<INavigate> = ({navigation}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  // const navigation = useNavigation();
  const route = useRoute<myAddressProps>();
  const {pageFrom} = route.params;
  const dispatch = useDispatch();
  const addressUrl = 'http://10.0.2.2:4000/authaddress';
  const [address, setAddress] = useState<IAddress[]>(
    userInfo?.useraddress ?? [],
  );
  const [selectedId, setSelectedId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editRemoveShowModal, setEditRemoveShowModal] =
    useState<boolean>(false);
  const [state, setState] = useState<'Add' | 'Edit'>('Add');

  const setAddressHandler = () => {
    setState('Add');
    navigation.navigate('navigateToSetAddressProfile', {state: 'Add'});
  };
  // useEffect(() => {
  //   if (route.params) {
  //     setAddress([route.params as IAddress]); // Wrap route.params in an array
  //   }
  // }, [route.params]);

  const removeHandler = (label: string, detail: string) => {};

  const backHanler = () => {
    if(pageFrom == 'FindPetFriend'){
      navigation.navigate('navigateToFindPF' as never);
    }else{
      navigation.navigate('navigateToProfile' as never);
    }
  };

  const retrieveInfo = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(
        `http://10.0.2.2:4000/authlogin/retrieve/${userInfo?.userid}`,
        {
          signal: abortController.signal,
        },
      );
      if (res.status == 200) {
        const result = res.data.data[0];
        dispatch(saveUserInfo(result));
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
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
  };

  const removeAddress = async (addressId: number) => {
    try {
      const res = await axios.delete(
        `${addressUrl}/remove/${addressId}/${userInfo?.userid}`,
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

  const editAddressHandler = (id: number) => {
    setState('Edit');
    navigation.navigate('navigateToSetAddressProfile', {state: 'Edit', id: id});
  };

  const updateSelectedAddress = async (
    userId: string | undefined,
    id: number,
  ) => {
    const body = {
      userId,
      id,
    };
    try {
      if (userId) {
        const res = await axios.post(
          `http://10.0.2.2:4000/authaddress/updateSelectedAddress`,
          body,
        );
        if (res.status === 200) {
          await retrieveInfo();
        }
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  useEffect(() => {
    if (userInfo) setAddress(userInfo?.useraddress);
  }, [userInfo]);

  return (
    <View className="bg-[#FFFFFF] h-full">
      <ScrollView>
        <View className="flex flex-col justify-between h-full">
          <View className="flex flex-row w-full border-b-[1px] border-neutral-200 py-4 px-4 items-center space-x-3">
            <TouchableOpacity
              onPress={backHanler}
              className="items-center w-6 h-6 justify-center">
              <BackArrow color="neutral-800" width={16} height={16} />
            </TouchableOpacity>

            <Text className="font-semibold text-neutral-800 text-base">
              My Address
            </Text>
          </View>
          <View className="flex flex-col h-fit w-full py-4 space-y-4">
            {address &&
              address.map(data => {
                return (
                  <View key={data.label} className="w-full px-4">
                    <View
                      className={`w-full ${
                        data.owner_flag
                          ? 'border-primary-500'
                          : 'border-neutral-300'
                      } rounded-2xl border-[1px]`}>
                      <View className="px-3 flex py-3 space-y-1">
                        <View className="flex-row gap-2 items-center">
                          <View className="w-9 h-9 bg-primary-50 rounded-[14px] items-center justify-center">
                            <LocationIcon />
                          </View>
                          <Text className="text-neutral-800 font-bold text-sm">
                            {data.label}
                          </Text>
                        </View>
                        <Text className="text-sm font-normal text-neutral-800">
                          {data.detailAddress}
                        </Text>
                      </View>
                      <View className="w-full flex flex-row space-x-2.5 border-neutral-200 border-t-[1px] rounded-b-2xl bg-neutral-50 py-3 px-3">
                        {!data.owner_flag ? (
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                updateSelectedAddress(userInfo?.userid, data.id)
                              }
                              className="w-fit flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                              <Text className="text-neutral-800 text-xs font-semibold">
                                Set as Pet Owner Address
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedId(data.id);
                                setEditRemoveShowModal(!editRemoveShowModal);
                              }}
                              className="w-fit flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                              <MoreVertical />
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                editAddressHandler(data.id),
                                  setEditRemoveShowModal(false);
                              }}
                              className="w-[71px] flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                              <EditIcon />
                              <Text className="text-neutral-800 text-xs font-semibold">
                                Edit
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedId(data.id),
                                  setShowModal(!showModal);
                              }}
                              className="w-24 flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                              <TrashIcon />
                              <Text className="text-neutral-800 text-xs font-semibold">
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}

            <TouchableOpacity
              onPress={setAddressHandler}
              className="w-full h-fit flex flex-row px-4 space-x-3 items-center">
              <View className="w-9 h-9 bg-neutral-100 rounded-[14px] items-center justify-center">
                <PlusIcon color='neutral-500'/>
              </View>
              <Text className="font-semibold text-lg text-neutral-500">
                Add Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ModalDialog
        visible={showModal}
        type="confirm-red"
        title="Remove Address?"
        desc="Your address will be removed."
        yesBtn="Yes, Remove"
        noBtn="No, Don't"
        onConfirm={() => {
          removeAddress(selectedId);
          setShowModal(!showModal);
          setEditRemoveShowModal(false);
        }}
        onCancel={() => setShowModal(!showModal)}
      />

      <EditRemoveSlideModal
        visible={editRemoveShowModal}
        editBtn="Edit Address"
        removeBtn="Remove Address"
        onClose={() => setEditRemoveShowModal(!editRemoveShowModal)}
        onRemove={() => {
          setShowModal(!showModal);
        }}
        onEdit={() => {
          editAddressHandler(selectedId), setEditRemoveShowModal(false);
        }}
      />
    </View>
  );
};

export default MyAddress;

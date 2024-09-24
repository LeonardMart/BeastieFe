import React, {FC, useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import BackArrow from '../../../icon/back-arrow/back-arrow';
import PlusIcon from '../../../icon/plus-icon/plus-icon';
import {useNavigation} from '@react-navigation/native';
import LocationIcon from '../../../icon/location-icon/location';
import EditIcon from '../../../icon/edit-icon/edit-icon';
import TrashIcon from '../../../icon/trash-icon/trash-icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import ModalDialog from '../../../component/modal-dialog/ModalDialog';
import MoreVertical from '../../../icon/more-vertical/more-vertical';
import axios from 'axios';
import {savePetCareInfo} from '../../../store/pet-care/action';
import EditRemoveSlideModal from '../../../component/slide-modal/EditRemoveSlideModal';

interface INavigate {
  navigation: any;
}

interface IAddress {
  tempId: string;
  label: string;
  detailAddress: string;
  longitude: number;
  latitude: number;
}

interface pfAddress {
  id: number;
  label: string;
  detail_address: string;
  latitude: number;
  longitude: number;
  pf_flag: boolean;
}

const PetCareAddress: FC<INavigate> = ({navigation}) => {
  const pfInfo = useSelector((state: RootState) => state.petCare?.petCareInfo);
  const pfUrl = 'http://10.0.2.2:4000';
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editRemoveShowModal, setEditRemoveShowModal] =
    useState<boolean>(false);
  const [state, setState] = useState<'Add' | 'Edit'>('Add');
  const [address, setAddress] = useState<pfAddress[]>(
    pfInfo?.user_addresses ?? [],
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const setAddressHandler = () => {
    navigation.navigate('navigateToPfSetAddres', {state: 'Add'});
  };

  const editAddressHandler = (id: number) => {
    setState('Edit');
    navigation.navigate('navigateToPfSetAddres', {state: 'Edit', id: id});
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
      if (res.status === 200) {
        const result = res.data.data[0];
        dispatch(savePetCareInfo(result));
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
  };

  const updateAddress = async (userId: string | undefined, id: number) => {
    const body = {
      userId,
      id,
    };
    try {
      if (userId) {
        const res = await axios.post(
          `${pfUrl}/authPf/updateSelectedAddressPf`,
          body,
        );
        if (res.status === 200) {
          await retrievePfInfo();
        }
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const removePfAddress = async (
    userId: string | undefined,
    addressId: number,
  ) => {
    try {
      const res = await axios.delete(
        `${pfUrl}/authPf/removeAddressPf/${userId}/${addressId}`
      );
      if (res.status == 200) {
        console.log('delete success');
        await retrievePfInfo();
      } else {
        throw new Error('Failed to remove address');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const backHandler = () => {
    navigation.navigate('navigateToPfProfile');
  };

  useEffect(() => {
    if (pfInfo) setAddress(pfInfo?.user_addresses);
  }, [pfInfo]);

  return (
    <View className="h-full bg-[#FFFFFF]">
      <View className="flex flex-row w-full border-b-[1px] border-neutral-200 py-4 px-4 items-center space-x-3">
        <TouchableOpacity
          onPress={backHandler}
          className="items-center w-6 h-6 justify-center">
          <BackArrow color="neutral-800" width={16} height={16} />
        </TouchableOpacity>
        <Text className="font-semibold text-neutral-800 text-base">
          Pet Care Address
        </Text>
      </View>
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
            {address &&
              address.map(data => (
                <View key={data.id} className="w-full px-4">
                  <View
                    className={`w-full ${
                      data.pf_flag ? 'border-primary-500' : 'border-neutral-300'
                    } rounded-2xl border-[1px]`}>
                    <View className="px-3 flex py-3 space-y-1">
                      <View className="flex-row gap-2 items-center">
                        <View className="w-9 h-9 bg-primary-50 rounded-[14px] items-center justify-center">
                          <LocationIcon />
                        </View>
                        <Text className="text-neutral-800 font-bold text-sm">
                          {data.label}
                        </Text>
                        {data.pf_flag && (
                          <View className="bg-primary-50 px-1.5 py-0.5 rounded-[10px]">
                            <Text className="text-[10px] font-bold text-primary-500">
                              Pet Care
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-sm font-normal text-neutral-500">
                        {data.detail_address}
                      </Text>
                    </View>
                    <View className="w-full flex flex-row space-x-2.5 border-neutral-200 border-t-[1px] rounded-b-2xl bg-neutral-50 py-3 px-3">
                      {!data.pf_flag ? (
                        <>
                          <TouchableOpacity
                            onPress={() =>
                              updateAddress(pfInfo?.user_id, data.id)
                            }
                            className="w-fit flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                            <Text className="text-neutral-800 text-xs font-semibold">
                              Set as Pet Care Address
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedAddressId(data.id);
                              setEditRemoveShowModal(!editRemoveShowModal);
                            }}
                            className="w-fit flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                            <MoreVertical />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={() => editAddressHandler(data.id)}
                            className="w-[71px] flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                            <EditIcon />
                            <Text className="text-neutral-800 text-xs font-semibold">
                              Edit
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setShowModal(!showModal);
                              setSelectedAddressId(data.id);
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
              ))}
            <TouchableOpacity
              onPress={setAddressHandler}
              className="w-full h-fit flex flex-row px-4 space-x-3 items-center">
              <View className="w-9 h-9 bg-neutral-100 rounded-[14px] items-center justify-center">
                <PlusIcon />
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
          removePfAddress(pfInfo?.user_id, selectedAddressId);
          setShowModal(false);
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
          setShowModal(!showModal)
        }}
        onEdit={() => {
          editAddressHandler(selectedAddressId), setEditRemoveShowModal(false);
        }}
      />
    </View>
  );
};

export default PetCareAddress;

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
import {RegisterContext} from './RegisterMain';
import PlusIcon from '../../icon/plus-icon/plus-icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import LocationIcon from '../../icon/location-icon/location';
import EditIcon from '../../icon/edit-icon/edit-icon';
import TrashIcon from '../../icon/trash-icon/trash-icon';

interface LoginProps {
  onNext?: any;

}

interface IIndex {
  selectedIndex: (a: number) => void;
  isSetAddress: () =>void
  setState: (a:'Add'|'Edit', b:string) => void
}

interface IAddress {
  tempId: string;
  label: string;
  detailAddress: string;
  longitude: number;
  latitude: number;
}

const Address: FC<IIndex> = ({selectedIndex, isSetAddress, setState}) => {
  const navigation = useNavigation();
  const route = useRoute();
  // const [state, setState] = useState<'Add'|'Edit'>('Add')
  // const {label, detailAddress} = route.params as { label?: string, detailAddress?: string }
  // const { name, email, password } = useRegister()
  const registerContext = useContext(RegisterContext);

  const [address, setAddress] = useState<IAddress[]>([]);

  const setAddressHandler = () => {
    isSetAddress()
    setState('Add', '')
  };


  const editAddressHandler = (id: string) =>{
    isSetAddress()
    setState('Edit', id)
  }

  const removeHandler = (id: string) => {
    const updatedLocation = registerContext?.location.filter(data => {
      return data.tempId != id;
    });

    if (updatedLocation) {
      registerContext?.setLocation(updatedLocation);
    }
  };

  const nextHandler = () =>{
    selectedIndex(1)
  }

  return (
    <View className="bg-[#FFFFFF] h-full">
      <ScrollView>
        <View className="flex flex-col justify-between h-full">
          <View className="flex flex-col h-fit w-full py-4 space-y-4">
            <View className="w-full flex flex-col px-4 gap-2">
              <Text className="font-bold text-lg text-neutral-800">
                Add Address
              </Text>
              <Text className="font-normal text-base text-neutral-500">
                Set up and add your address to find nearby pet friends.{' '}
              </Text>
            </View>

            {registerContext?.location.map(data => {
              return (
                <View key={data.tempId} className="w-full px-4">
                  <View className="w-full border-neutral-200 rounded-2xl border-[1px]">
                    <View className="px-3 flex py-3 space-y-1">
                      <View className="flex-row gap-2 items-center">
                        <View className="w-9 h-9 bg-primary-50 rounded-[14px] items-center justify-center">
                          <LocationIcon />
                        </View>
                        <Text className="text-neutral-800 font-bold">
                          {data.label}
                        </Text>
                      </View>
                      <Text className="text-sm font-normal text-neutral-800">
                        {data.detailAddress}
                      </Text>
                    </View>
                    <View className="w-full flex flex-row space-x-2.5 border-neutral-200 border-t-[1px] rounded-b-2xl bg-neutral-50 py-3 px-3">
                      <TouchableOpacity onPress={()=>editAddressHandler(data.tempId)} className="w-[71px] flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                        <EditIcon />
                        <Text className="text-neutral-800 text-xs font-semibold">
                          Edit
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          removeHandler(data.tempId)
                        }
                        className="w-24 flex flex-row space-x-2 items-center bg-[#FFFFFF] border-neutral-200 border-[1px] rounded-xl py-1.5 px-3">
                        <TrashIcon />
                        <Text className="text-neutral-800 text-xs font-semibold">
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}

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
      <View className="w-full flex flex-col px-4 mb-4 space-y-4">
        {registerContext?.location && registerContext?.location.length > 0 ? (
          <TouchableOpacity onPress={nextHandler} className="bg-primary-500 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF]">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
          disabled={true}
          className="bg-neutral-300 w-full flex flex-row items-center py-3 px-3 rounded-2xl justify-center">
            <Text className="text-[#FFFFFF]">Next</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className="justify-center items-center">
          <Text className="text-neutral-800 font-semibold text-sm">
            Skip For Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Address;

import React, {FC, useRef, useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CloseIcon from '../../../icon/close-icon/close-icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import axios from 'axios';
import {updateAddress, updatePet} from '../../../store/pet-owner/action';
import ModalDialog from '../../../component/modal-dialog/ModalDialog';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {savePetCareInfo} from '../../../store/pet-care/action';

interface INavigate {
  navigation: any;
}

interface IMarker {
  latitude: number;
  longitude: number;
}

interface IMap {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface pfAddress {
  id?: number;
  label: string;
  detail_address: string;
  latitude: number;
  longitude: number;
}

type AddEditAddressProps = RouteProp<
  RootStackParamList,
  'navigateToPfSetAddres'
>;

const AddEditAddress: FC<INavigate> = ({navigation}) => {
  const route = useRoute<AddEditAddressProps>();
  const {state, id} = route.params;
  console.log('state', state);
  const pfInfo = useSelector((state: RootState) => state.petCare?.petCareInfo);
  const pfUrl = 'http://10.0.2.2:4000';
  const dispatch = useDispatch();
  const addressUrl = 'http://10.0.2.2:4000/authaddress';
  const [label, setLabel] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [markerData, setMarkerData] = useState<IMarker>({
    latitude: 35.1790507,
    longitude: -6.1389008,
  });
  const [mapData, setMapData] = useState<IMap>({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [address, setAddress] = useState<pfAddress>({
    label: '',
    detail_address: '',
    latitude: 0,
    longitude: 0,
  });

  const mapRef = useRef<MapView>(null);

  const handleRegionChange = (data: any) => {
    setAddress({
      ...address,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    setMarkerData({latitude: data.latitude, longitude: data.longitude});
    setMapData(data);
  };

  useEffect(() => {
    if (state === 'Edit' && id && pfInfo?.user_addresses) {
      const addressToEdit: pfAddress | undefined = pfInfo?.user_addresses.find(
        data => data.id === id,
      );
      if (addressToEdit) {
        setAddress(addressToEdit);
        setMarkerData({
          latitude: addressToEdit.latitude,
          longitude: addressToEdit.longitude,
        });
        setMapData({
          latitude: addressToEdit.latitude,
          longitude: addressToEdit.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }
  }, [state, id, pfInfo]);

  const retrieveAddress = async () => {
    const abortController = new AbortController();
    try {
      const res = await axios.get(`${addressUrl}/retrieve/`, {
        signal: abortController.signal,
      });
      if (res.status == 200) {
        dispatch(updateAddress(res.data.data));
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
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
        console.log("masuk")
        const result = res.data.data[0];
        if(result)
        dispatch(savePetCareInfo(result));
        navigation.navigate('navigateToPfAddress')
      }
    } catch (error) {
      if (abortController.signal.aborted) {
        console.log('Data fetching cancelled');
      }
    }
  };

  const addEditAddress = async (userId: string | undefined, id: number|undefined) => {
    try {
      if (state == 'Edit' && id) {
        if (userId) {
            const body = {
                userId,
                id,
                address
              };
          const res = await axios.post(`${pfUrl}/authPf/updateAddressPf`, body);
          if (res.status === 200) {
            await retrievePfInfo();
          }
        }
      }else if(state == 'Add'){
        console.log("masuk")
        if (userId) {
            const body = {
                userId,
                address
              };
              console.log("masuk")
            const res = await axios.post(`${pfUrl}/authPf/addAddressPf`, body);
            console.log("masuk")
            if (res.status === 200) {
              await retrievePfInfo();
            }
          }
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };

  const removePet = async (petId: number) => {
    try {
      const res = await axios.delete(`${addressUrl}/remove/${petId}/`);
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

  useEffect(() => {
    if (state === 'Edit' && id && pfInfo?.user_addresses) {
      const addressToEdit: pfAddress[] = pfInfo?.user_addresses.filter(data => {
        return data.id === id;
      });
      if (addressToEdit.length > 0) {
        setAddress(addressToEdit[0]);
      }
    }
  }, [state, pfInfo]);

  
  const backHandler= ()=>{
    navigation.navigate('navigateToPfAddress')
  }
 

  return (
    <>
      {/* <View className="h-full w-full justify-between"> */}
      <View className="z-20 order-1 flex flex-row items-center space-x-3 bg-[#FFFFFF] px-4 py-4 w-full">
        <TouchableOpacity onPress={backHandler}>
          <CloseIcon />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-neutral-800">
          Add Address
        </Text>
      </View>
      <View className="w-full h-[65%] items-center">
        <MapView
          ref={mapRef}
          style={styles.map}
          region={mapData}
          followsUserLocation={true}
          onRegionChangeComplete={handleRegionChange}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>
          <Marker title="You are here" coordinate={markerData} />
        </MapView>
        <View className="absolute flex justify-center h-full z-20 w-fit">
          <Text className="text-primary-500 text-7xl">.</Text>
        </View>
      </View>

      <View className="z-30 flex h-72 justify-between bg-[#FFFFFF] w-full absolute bg-[#FFFFFF] rounded-t-2xl rounded-tr-2xl bottom-0 pt-6">
        <View className="flex flex-col w-full space-y-3 px-4">
          <View className="w-full space-y-[2px]">
            <Text className="font-semibold text-neutral-800 text-xs">
              Label
            </Text>
            <TextInput
              value={address.label}
              onChangeText={a => setAddress({...address, label: a})}
              placeholder="Add Label"
              className="rounded-[14px] bg-neutral-100 py-2"></TextInput>
          </View>
          <View className="w-full space-y-[2px]">
            <Text className="font-semibold text-neutral-800 text-xs">
              Detailed Address (optional)
            </Text>
            <TextInput
              value={address.detail_address}
              onChangeText={a => setAddress({...address, detail_address: a})}
              placeholder="Add Detail"
              className="rounded-[14px] bg-neutral-100 py-2"></TextInput>
          </View>
        </View>

        <TouchableOpacity onPress={()=>addEditAddress(pfInfo?.user_id, id)} className="bg-primary-500 py-3 rounded-2xl shadow-md shadow-black mb-6 mx-4">
          <Text className="text-center font-bold text-lg text-[#FFFFFF]">
            Add
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    alignItems: 'center',
    height: '70%',
  },
  map: {
    width: '100%',
    flex: 1,
  },
});
export default AddEditAddress;

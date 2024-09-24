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

interface IIndex {
  isSetAddress: () => void;
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

const SetAddressPf: FC<IIndex> = ({isSetAddress}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
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

  const mapRef = useRef<MapView>(null);

  const handleRegionChange = (data: any) => {
    setMarkerData({latitude: data.latitude, longitude: data.longitude});
    setMapData(data);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      console.log('address', pos);
      console.log('address', mapData);
      setMapData({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  }, []);
  
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

  const removePet = async (petId: number) => {
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

  return (
    <>
      {/* <View className="h-full w-full justify-between"> */}
        <View className="z-20 order-1 flex flex-row items-center space-x-3 bg-[#FFFFFF] px-4 py-4 w-full">
          <TouchableOpacity onPress={isSetAddress} >
            <CloseIcon />
          </TouchableOpacity>
          <Text className='text-base font-semibold text-neutral-800'>Add Address</Text>
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
                value={label}
                onChangeText={setLabel}
                placeholder="Add Label"
                className="rounded-[14px] bg-neutral-100 py-2"></TextInput>
            </View>
            <View className="w-full space-y-[2px]">
              <Text className="font-semibold text-neutral-800 text-xs">
                Detailed Address (optional)
              </Text>
              <TextInput
                value={detailAddress}
                onChangeText={setDetailAddress}
                placeholder="Add Detail"
                className="rounded-[14px] bg-neutral-100 py-2"></TextInput>
            </View>
          </View>

          <TouchableOpacity
            className="bg-primary-500 py-3 rounded-2xl shadow-md shadow-black mb-6 mx-4">
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
export default SetAddressPf;

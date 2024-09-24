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
import CloseIcon from '../../icon/close-icon/close-icon';
import {RegisterContext} from './RegisterMain';
import {useRoute} from '@react-navigation/native';

interface IIndex {
  isSetAddress: () => void;
  setState: (a: 'Add' | 'Edit') => void;
  state: 'Add' | 'Edit';
  addressId?: string;
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

interface IAddress {
  tempId: string;
  label: string;
  detailAddress: string;
  longitude: number;
  latitude: number;
}

const SetAddress: FC<IIndex> = ({isSetAddress, setState, state, addressId}) => {
  const registerContext = useContext(RegisterContext);
  const [label, setLabel] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [address, setAddress] = useState<IAddress>({
    tempId: new Date().toString(),
    label: '',
    detailAddress: '',
    longitude: 35.1790507,
    latitude: -6.1389008,
  });
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

  const closeHandler = () => {
    isSetAddress();
    setState('Add');
  };

  const handleRegionChange = (data: any) => {
    setAddress({
      ...address,
      latitude: data.latitude,
      longitude: data.longitude,
    });
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

  const addHandler = () => {
    if (state === 'Edit' && addressId !== '') {
      const addressIndex = registerContext?.location.findIndex(
        (data: IAddress) => data.tempId.toString() === addressId,
      );
      console.log('address', addressIndex);
      if (addressIndex && addressIndex != -1 && registerContext?.location) {
        const updatedLocation: IAddress[] = [...registerContext.location];
        updatedLocation[addressIndex] = {
          ...updatedLocation[addressIndex],
          ...address,
        };
        registerContext.setLocation(updatedLocation);
      }
    } else if (state == 'Add') {
      registerContext?.setLocation([...registerContext?.location, address]);
    }
    isSetAddress();
  };

  useEffect(() => {
    if (state == 'Edit' && addressId != '') {
      const editData = registerContext?.location.filter(data => {
        return data.tempId == addressId;
      });
      if (editData) {
        setAddress(editData[0]);
      }
    }
  }, [state == 'Edit']);

  return (
    <View className="h-full w-full justify-between">
      <View className="z-20 order-1 flex flex-row justify-between bg-[#FFFFFF] p-2.5 w-full">
        <TouchableOpacity onPress={closeHandler}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <View className="w-full h-[60%] items-center">
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

      <View className="z-30 flex h-72 justify-between bg-[#FFFFFF] w-full rounded-t-2xl rounded-tr-2xl bottom-0 pt-6">
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
              value={address.detailAddress}
              onChangeText={a => setAddress({...address, detailAddress: a})}
              placeholder="Add Detail"
              className="rounded-[14px] bg-neutral-100 py-2"></TextInput>
          </View>
        </View>

        <TouchableOpacity
          onPress={addHandler}
          className="bg-primary-500 py-3 rounded-2xl shadow-md shadow-black mb-6 mx-4">
          <Text className="text-center font-bold text-lg text-[#FFFFFF]">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
export default SetAddress;

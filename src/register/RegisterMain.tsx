import React, {FC, createContext, useEffect, useState} from 'react';
import Register from './Register';
import Address from './Address';
import {View} from 'react-native';
import AddPet from './AddPet';
import {useHttpRequest} from '../../hooks/useHttpRequest';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import SetAddress from './SetAddress';

interface IProps {
  navigation: any;
}

interface AddressInfo {
  tempId: string;
  label: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}
interface PetInfo {
  tempId: string;
  name: string;
  petType: number;
  gender: string;
  dob: Date;
  breed: string;
}
interface RegisterContextType {
  name: string;
  email: string;
  password: string;
  phoneNum: string;
  location: AddressInfo[];
  pets: PetInfo[];
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNum: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<AddressInfo[]>>;
  setPets: React.Dispatch<React.SetStateAction<PetInfo[]>>;
}

export const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

const RegisterMain: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [state, setState] = useState<'Add' | 'Edit'>('Add');
  const [addressId, setAddressId] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [location, setLocation] = useState<AddressInfo[]>([]);
  const [pets, setPets] = useState<PetInfo[]>([]);
  const [showSetAddress, setShowSetAddress] = useState<boolean>(false);
  const RegisterServiceUrl = process.env.BEASTIE_APP_AUTH;
  const {sendRequest} = useHttpRequest(RegisterServiceUrl);
  const navigation = useNavigation();

  const registHandler = async () => {
    const body = {
      name,
      email,
      password,
      phoneNum,
      location,
      pets,
    };
    console.log(RegisterServiceUrl);
    try {
      const res = await axios.post(
        'http://10.0.2.2:4000/authregister/register',
        body,
      );
      if (res.status == 200) {
        navigation.navigate('navigateToMain' as never);
      }
    } catch (error) {
      console.log('An error has occurred');
    }
  };
  // useEffect(() => {
  //   console.log('name', name);
  // }, [name]);

  // useEffect(() => {
  //   console.log('address jos jos', location);
  // }, [location]);

  useEffect(() => {
    console.log('address jos jos', pets);
  }, [pets]);

  return (
    <>
      <RegisterContext.Provider
        value={{
          name,
          setName,
          email,
          setEmail,
          password,
          setPassword,
          phoneNum,
          setPhoneNum,
          location,
          setLocation,
          pets,
          setPets,
        }}>
        <View>
          {!showSetAddress ? (
            <>
              {selectedIndex == 0 && (
                <Register
                  selectedIndex={a => setSelectedIndex(selectedIndex + a)}
                />
              )}
              {selectedIndex == 1 && (
                <Address
                  selectedIndex={a => setSelectedIndex(selectedIndex + a)}
                  isSetAddress={() => setShowSetAddress(!showSetAddress)}
                  setState={(a, b) => {
                    setState(a), setAddressId(b);
                  }}
                />
              )}
              {selectedIndex == 2 && <AddPet onFinish={registHandler} />}
            </>
          ) : (
            <SetAddress
              isSetAddress={() => setShowSetAddress(!showSetAddress)}
              state={state}
              setState={a => setState(a)}
              addressId={addressId}
            />
          )}
        </View>
      </RegisterContext.Provider>
    </>
  );
};

export default RegisterMain;

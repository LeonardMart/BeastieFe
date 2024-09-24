/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/login/Login';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/register/RegisterMain';
// import Home from './src/home/home';
// import Main from './src/main';
// import ChatRoom from './src/chat/chat-room';
import Navbar from './src/navbar/Navbar';
import AddPet from './src/register/AddPet';
import BottomSheet from './src/register/BottomSheet';
import Main from './src/main';
import SetAddress from './src/register/SetAddress';
import SetAddressProfile from './src/profile/component-address/SetAddress';
import Profile from './src/profile/Profile';
import MyPets from './src/profile/MyPets';
import MyAddress from './src/profile/MyAddress';
import BePetFriend from './src/be-pet-friend/BePetFriend';
import SetAddressPf from './src/be-pet-friend/component/SetAddressPf';
import PfProfile from './src/pet-friend/profile/PfProfile';
import {Provider as PetCareProvider} from 'react-redux';
import ServicePricelist from './src/pet-friend/servicePrice/ServicePricelist';
import PetCareAddress from './src/pet-friend/address/PetCareAddress';
import AddEditAddress from './src/pet-friend/address/AddEditAddress';
import FindPetFriend from './src/find-pet-friend/FindPetFriend';
import SplashScreen from './src/splash-screen/SplashScreen';
import Bookings from './src/bookings/Bookings';
import DetailOrder from './src/order_history/DetailOrder';
import IncomingBookings from './src/pet-friend/incoming-bookings/IncomingBookings';
import DetailIncomingOrder from './src/pet-friend/incoming-bookings/DetailIncomingOrder';
import Reviews from './src/pet-friend/reviews/Reviews';

export type RootStackParamList = {
  navigateToSplash: undefined;
  navigateToMain: undefined;
  navigateToRegister: undefined;
  navigateToSetAddressProfile: {state: 'Add' | 'Edit'; id?: number};
  navigateToLogin: undefined;
  navigateToHome: undefined;
  navigateToFindPF: undefined;
  navigateToBookings: {pfId: string};
  navigateToDetailOrder: {orderId: number};
  navigateToIncomingOrders: undefined;
  navigateToDetailIncomingOrders: {orderId: number};
  navigateToProfile: undefined;
  navigateToPet: undefined;
  navigateToAddress: {pageFrom?: string};
  navigateToBePf: undefined;
  navigateToPfProfile: undefined;
  navigateToPfReviews: undefined;
  navigateToPfService: undefined;
  navigateToPfAddress: undefined;
  navigateToPfSetAddres: {state: 'Add' | 'Edit'; id?: number};
  // Details: { itemId: number; otherParam: string };
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="navigateToSplash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="navigateToSplash" component={SplashScreen} />
        <Stack.Screen name="navigateToMain" component={Main} />
        <Stack.Screen name="navigateToRegister" component={Register} />
        {/* <Stack.Screen name="navigateToSetAddress" component={SetAddress} /> */}
        <Stack.Screen
          name="navigateToSetAddressProfile"
          component={SetAddressProfile}
        />
        <Stack.Screen name="navigateToLogin" component={Login} />
        {/* <Stack.Screen name='navigateToAddressPage' component={Address}/> */}
        <Stack.Screen name="navigateToHome" component={Navbar} />
        <Stack.Screen name="navigateToProfile" component={Profile} />
        <Stack.Screen name="navigateToPet" component={MyPets} />
        <Stack.Screen name="navigateToAddress" component={MyAddress} />
        <Stack.Screen name="navigateToBePf" component={BePetFriend} />
        <Stack.Screen name="navigateToFindPF" component={FindPetFriend} />
        <Stack.Screen name="navigateToBookings" component={Bookings} />
        <Stack.Screen name="navigateToDetailOrder" component={DetailOrder} />
        <Stack.Screen
          name="navigateToIncomingOrders"
          component={IncomingBookings}
        />
        <Stack.Screen
          name="navigateToDetailIncomingOrders"
          component={DetailIncomingOrder}
        />

        <Stack.Screen name="navigateToPfProfile" component={PfProfile} />
        <Stack.Screen name="navigateToPfReviews" component={Reviews} />
        <Stack.Screen name="navigateToPfService" component={ServicePricelist} />
        <Stack.Screen name="navigateToPfAddress" component={PetCareAddress} />
        <Stack.Screen name="navigateToPfSetAddres" component={AddEditAddress} />
        {/* <Stack.Screen name = 'main' component={Main}/>
        <Stack.Screen name = 'chat-room' component={ChatRoom}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

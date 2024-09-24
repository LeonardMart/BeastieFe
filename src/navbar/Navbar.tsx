import React, {FC, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Home from '../home/Home';
import Bookings from '../bookings/Bookings';
import HomeIcon from '../../icon/navbar-icon/home-icon';
import BookingsIcon from '../../icon/navbar-icon/bookings-icon';
import Bookmark from '../bookmark/Bookmark';
import PetFriendsIcon from '../../icon/navbar-icon/pet-friend-icon';
import styles from './Styles';
import OrderHistory from '../order_history/OrderHistory';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useHttpRequest} from '../../hooks/useHttpRequest';
import {saveUserOrderInfo} from '../../store/pet-owner/order/orderAction';
import {saveUserBookmarkInfo} from '../../store/pet-owner/bookmark/bookmarkAction';

interface LoginProps {
  navigation: any;
  route: any;
}

const Tab = createBottomTabNavigator();
// const route = useRoute()
const Navbar: FC<LoginProps> = ({navigation, route}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
  const [focusedRoute, setFocusedRoute] = useState<string | undefined>('Home');
  const handleHome = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    if (getFocusedRouteNameFromRoute(route) != undefined) {
      setFocusedRoute(getFocusedRouteNameFromRoute(route));
    }
  }, [route]);

  const Base = `http://10.0.2.2:4000/authPetOwner`;
  const {sendRequest: getRequest, sendRequest} = useHttpRequest(Base);

  const getOrderList = async () => {
    const res = await getRequest({
      url: `/retrieveOwnerOrder/${userInfo?.userid}`,
      method: 'get',
    });
    if (res.status == 1) {
      dispatch(saveUserOrderInfo(res.data));
    }
  };

  const getBookmarkList = async () => {
    const body = {
      userId: userInfo?.userid,
      searchKeyword: '',
    };
    const res = await sendRequest({
      url: `/getBookmarkPf`,
      method: 'post',
      body,
    });
    if (res.status == 1) {
      dispatch(saveUserBookmarkInfo(res.data));
    }
  };

  useEffect(() => {
    getOrderList().catch(e => console.log('error retrieve order history', e));
    getBookmarkList().catch(e => console.log('error retrieve bookmark list', e))
  }, [focusedRoute]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'white', height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#4871F7',
          tabBarLabelStyle: {...styles.label},
          tabBarIcon: ({color, size}) => <HomeIcon filled={focusedRoute} />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={OrderHistory}
        options={{
          tabBarLabel: 'Bookings',
          tabBarActiveTintColor: '#4871F7',
          tabBarLabelStyle: {...styles.label},
          tabBarIcon: ({color, size}) => <BookingsIcon filled={focusedRoute} />,
        }}
      />

      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarLabel: 'Pet Friends',
          tabBarActiveTintColor: '#4871F7',
          tabBarLabelStyle: {...styles.label},
          tabBarIcon: ({color, size}) => (
            <PetFriendsIcon filled={focusedRoute} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;

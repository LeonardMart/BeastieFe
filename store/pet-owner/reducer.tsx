// reducer.ts
import {Reducer} from 'redux'; // Corrected import
import {RESET_STATE, SAVE_USER_INFO, UPDATE_ADDRESS, UPDATE_PET} from './actionTypes';
import {UserInfo} from '../types';

interface UserState {
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  userInfo: null,
};

const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case SAVE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case UPDATE_PET:
      return {
        ...state,
        userInfo: {...state.userInfo, pets: action.payload},
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        userInfo: {...state.userInfo, useraddress: action.payload},
      };
    default:
      return state;
  }
};

export default userReducer;

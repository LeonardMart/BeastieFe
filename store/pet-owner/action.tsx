// actions.ts
import {SAVE_USER_INFO, RESET_STATE, UPDATE_PET, UPDATE_ADDRESS} from './actionTypes';
import {Pet, UserInfo} from '../types';

export const saveUserInfo = (userInfo: UserInfo) => ({
  type: SAVE_USER_INFO,
  payload: userInfo,
});

export const resetState = () => ({
  type: RESET_STATE,
});

export const updatePet = (newPetData: Pet[]) => ({
  type: UPDATE_PET,
  payload: newPetData,
});

export const updateAddress = (newAddressData: Pet[]) => ({
  type: UPDATE_ADDRESS,
  payload: newAddressData,
});
// petCareActions.ts
export const SAVE_PET_CARE_INFO = 'SAVE_PET_CARE_INFO';
export const RESET_PET_CARE_STATE = 'RESET_PET_CARE_STATE';

import { PetCareInfo } from '../types';

export const savePetCareInfo = (petCareInfo: PetCareInfo) => ({
  type: SAVE_PET_CARE_INFO,
  payload: petCareInfo,
});

export const resetPetCareState = () => ({
  type: RESET_PET_CARE_STATE,
});

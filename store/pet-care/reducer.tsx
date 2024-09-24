// petCareReducer.ts
import {Reducer} from 'redux';
import {SAVE_PET_CARE_INFO, RESET_PET_CARE_STATE} from './action';
import {PetCareInfo} from '../types';

interface PetCareState {
  petCareInfo: PetCareInfo | null;
}

const initialState: PetCareState = {
  petCareInfo: null,
};

const petCareReducer: Reducer<PetCareState, any> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case RESET_PET_CARE_STATE:
      return initialState;
    case SAVE_PET_CARE_INFO:
      return {
        ...state,
        petCareInfo: action.payload,
      };
    default:
      return state;
  }
};

export default petCareReducer;

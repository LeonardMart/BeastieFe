// reducer.ts
import {Reducer} from 'redux'; // Corrected import
import {SAVE_PF_ORDER_INFO} from './incomingOrderTypes';
import {OwnerHistory} from '../../types';

interface OrderState {
  pfOrderInfo: OwnerHistory[] | null;
}

const initialState: OrderState = {
  pfOrderInfo: [],
};

const pfOrderReducer: Reducer<OrderState, any> = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PF_ORDER_INFO:
      return {
        ...state,
        pfOrderInfo: action.payload,
      };
    default:
      return state;
  }
};

export default pfOrderReducer;

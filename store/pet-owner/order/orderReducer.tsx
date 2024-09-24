// reducer.ts
import {Reducer} from 'redux'; // Corrected import
import {SAVE_USER_ORDER_INFO} from './orderTypes';
import {OwnerHistory} from '../../types';

interface OrderState {
  orderInfo: OwnerHistory[] | null;
}

const initialState: OrderState = {
  orderInfo: [],
};

const userOrderReducer: Reducer<OrderState, any> = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_ORDER_INFO:
      return {
        ...state,
        orderInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userOrderReducer;

// actions.ts
import {SAVE_USER_ORDER_INFO} from './orderTypes';
import {OwnerHistory} from '../../types';

export const saveUserOrderInfo = (ownerOrderInfo: OwnerHistory[]) => ({
  type: SAVE_USER_ORDER_INFO,
  payload: ownerOrderInfo,
});
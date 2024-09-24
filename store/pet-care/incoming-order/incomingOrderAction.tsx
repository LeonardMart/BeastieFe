// actions.ts
import {SAVE_PF_ORDER_INFO} from './incomingOrderTypes';
import {OwnerHistory} from '../../types';

export const savePfOrderInfo = (ownerOrderInfo: OwnerHistory[]) => ({
  type: SAVE_PF_ORDER_INFO,
  payload: ownerOrderInfo,
});
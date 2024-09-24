import { createStore, combineReducers } from 'redux';
import userReducer from './pet-owner/reducer';
import petCareReducer from './pet-care/reducer';
import userOrderReducer from './pet-owner/order/orderReducer';
import pfOrderReducer from './pet-care/incoming-order/incomingOrderReducer';
import userBookmarkReducer from './pet-owner/bookmark/bookmarkReducer';

// Combine all reducers into a rootReducer
export const rootReducer = combineReducers({
  user: userReducer,
  userOrder: userOrderReducer,
  userBookmarkk:userBookmarkReducer,
  petCare: petCareReducer,
  pfOrder: pfOrderReducer,
  // Add other reducers here if needed
});

// Create the Redux store
const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store

import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store
import App from './App'; // Your root component

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;

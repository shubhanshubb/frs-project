import { StatusBar } from 'native-base';
import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './config/ReactronConfig';
import AppNavigation from './navigation';
import reduxStore from './redux/Store';
import { toastConfig } from './services/toastService';

const App = () => {
  return (
    <Provider store={reduxStore.store}>
      <PersistGate loading={null} persistor={reduxStore.persistor}>
        <StatusBar barStyle="dark-content" backgroundColor={'#F9F9F9'} />
        <AppNavigation />
        <Toast position="bottom" config={toastConfig} />
      </PersistGate>
    </Provider>
  );
};

export default __DEV__ ? console.tron.overlay(App) : App;

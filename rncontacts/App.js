import 'react-native-gesture-handler';
import React from 'react';
import {AppNavContainer} from './src/navigations/AppNavContainer';
import {GlobalProvider} from './src/context/reducers/Provider';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;

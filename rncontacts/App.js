import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {AppNavContainer} from './src/navigations/AppNavContainer';
import {AuthContext} from './src/context/context';

const App = () => {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <AppNavContainer />
    </AuthContext.Provider>
  );
};

export default App;

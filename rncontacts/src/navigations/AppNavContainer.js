import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {AuthContext} from '../context/context';

export function AppNavContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

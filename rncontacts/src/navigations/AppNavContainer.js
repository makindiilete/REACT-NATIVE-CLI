import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {AuthContext} from '../context/context';
import {getFromStorage} from '../config/storage';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../assets/themes/colors';
import {navigationRef} from './RootNavigator';
import SplashScreen from 'react-native-splash-screen';

export function AppNavContainer() {
  const [appIsReady, setAppIsReady] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  const getUser = async () => {
    const user = await getFromStorage('user');
    console.log('User is here = ', user);
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await getUser();
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  /* if (!appIsReady) {
    return null;
  }*/

  return (
    /*ds ref we create here allows us to be able to use our RootNavigator.js to navigate from components that doesnt have the useNavigation hook*/
    <NavigationContainer ref={navigationRef}>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {AuthContext} from '../context/context';
import {getFromStorage} from '../config/storage';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../assets/themes/colors';
import {navigationRef} from './RootNavigator';

export function AppNavContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  const getUser = async () => {
    setIsLoading(true);
    const user = await getFromStorage('user');
    console.log('User is here = ', user);
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    /*ds ref we create here allows us to be able to use our RootNavigator.js to navigate from components that doesnt have the useNavigation hook*/
    <NavigationContainer ref={navigationRef}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : user ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

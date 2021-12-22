import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routes from '../constants/routes';
import {Login} from '../screens/Login';
import {Register} from '../screens/Register';

const AuthNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SIGN_UP} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

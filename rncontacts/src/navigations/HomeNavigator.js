import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import routes from '../constants/routes';
import {Contacts} from '../screens/Contacts';
import {ContactDetail} from '../screens/ContactDetail';
import {CreateContact} from '../screens/CreateContact';
import {Settings} from '../screens/Settings';

const HomeNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={routes.CONTACT}>
      <Stack.Screen name={routes.CONTACT} component={Contacts} />
      <Stack.Screen name={routes.CONTACT_DETAIL} component={ContactDetail} />
      <Stack.Screen name={routes.CREATE_CONTACT} component={CreateContact} />
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

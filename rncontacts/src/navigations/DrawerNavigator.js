import React from 'react';
import routes from '../constants/routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';

const DrawerNavigator = (props) => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator>
      {/*D drawer (sidebar) navigator will contain the homenavigator so dt swiping from d side U can access d drawer and closing the drawer we have d HomeNavigator*/}
      <drawer.Screen name={routes.HOME} component={HomeNavigator} />
    </drawer.Navigator>
  );
};

export default DrawerNavigator;

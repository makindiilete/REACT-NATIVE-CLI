import React from 'react';
import routes from '../constants/routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppContainer} from '../components/AppContainer';
import {colors} from '../assets/themes/colors';
import AppSideMenu from '../components/AppSideMenu';

const DrawerNavigator = (props) => {
  const drawer = createDrawerNavigator();

  const getDrawerContent = (navigation) => {
    return <AppSideMenu navigation={navigation} />;
  };

  return (
    <drawer.Navigator
      drawerType="slide"
      drawerContent={({navigation}) => getDrawerContent(navigation)}>
      {/*D drawer (sidebar) navigator will contain the homenavigator so dt swiping from d side U can access d drawer and closing the drawer we have d HomeNavigator*/}
      <drawer.Screen name={routes.HOME} component={HomeNavigator} />
    </drawer.Navigator>
  );
};

export default DrawerNavigator;

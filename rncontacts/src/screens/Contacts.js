import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppContainer} from '../components/AppContainer';
import {useNavigation} from '@react-navigation/native';

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <Text style={{padding: 10}}>NAV</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <AppContainer style={{padding: 100}}>
      <Text>Hi, from contacts</Text>
    </AppContainer>
  );
};

import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppContainer} from '../components/AppContainer';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIcon from '../components/AppIcon';

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const {setOptions, toggleDrawer} = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <AppIcon
            type="MaterialIcons"
            name="menu"
            size={30}
            style={{padding: 10}}
          />
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

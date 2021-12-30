import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIcon from '../components/AppIcon';
import AppModal from '../components/AppModal';
import {AppButton} from '../components/AppButton';
import {colors} from '../assets/themes/colors';

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
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
      <AppButton
        primary
        onPress={() => setModalVisible(true)}
        title="Show Modal"
      />
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        modalTitle="My Profile!"
        modalBody="Hello from the modal"
        modalFooter={<></>}
      />
    </AppContainer>
  );
};

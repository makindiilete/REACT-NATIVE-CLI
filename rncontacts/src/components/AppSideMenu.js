import React, {useEffect} from 'react';
import {AppContainer} from './AppContainer';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes from '../constants/routes';
import {colors} from '../assets/themes/colors';

const AppSideMenu = ({navigation}) => {
  const menuItems = [
    {
      icon: <Text style={styles.itemIcon}>T</Text>,
      name: 'Settings',
      onPress: () => navigation.navigate(routes.SETTINGS),
    },
    {
      icon: <Text style={styles.itemIcon}>L</Text>,
      name: 'Log Out',
      onPress: () => {},
    },
  ];

  return (
    <AppContainer>
      <View>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
        />
        {menuItems?.map((item) => (
          <TouchableOpacity
            style={styles.item}
            key={item.name}
            onPress={item.onPress}>
            {item.icon}
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </AppContainer>
  );
};

export default AppSideMenu;

const styles = StyleSheet.create({
  logoImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 17,
    paddingVertical: 7,
    color: colors.white,
    paddingLeft: 10,
  },
  itemIcon: {color: colors.white, fontSize: 17, fontWeight: 'bold'},
});

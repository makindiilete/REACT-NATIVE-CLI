import React, {useContext, useEffect} from 'react';
import {AppContainer} from './AppContainer';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import routes from '../constants/routes';
import {colors} from '../assets/themes/colors';
import {removeFromStorage} from '../config/storage';
import {AuthContext} from '../context/context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIcon from './AppIcon';

const AppSideMenu = ({navigation}) => {
  // const {toggleDrawer} = useNavigation();
  const {user, setUser} = useContext(AuthContext);
  const menuItems = [
    {
      icon: (
        <AppIcon
          type="MaterialIcons"
          name="settings"
          size={30}
          style={{padding: 10, color: colors.white}}
        />
      ),
      name: 'Settings',
      onPress: () => navigation.navigate(routes.SETTINGS),
    },
    {
      icon: (
        <AppIcon
          type="MaterialIcons"
          name="logout"
          size={30}
          style={{padding: 10, color: colors.white}}
        />
      ),
      name: 'Log Out',
      onPress: () => {
        navigation.toggleDrawer();
        Alert.alert('Logout!', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            style: 'destructive',
          },
          {
            text: 'Ok',
            onPress: async () => {
              setUser(null);
              await removeFromStorage('user');
              await removeFromStorage('token');
            },
          },
        ]);
      },
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

import React, {useCallback, useContext, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from '../assets/themes/colors';
import {removeFromStorage} from '../config/storage';
import {AuthContext} from '../context/context';
import {useFocusEffect} from '@react-navigation/native';

export function Logout({route}) {
  const {user, setUser} = useContext(AuthContext);

  async function logout() {
    setUser(null);
    await removeFromStorage('user');
    await removeFromStorage('token');
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

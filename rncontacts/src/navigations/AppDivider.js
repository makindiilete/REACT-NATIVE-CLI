import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet} from 'react-native';

export function AppDivider() {
  return (
    <View
      style={{
        backgroundColor: '#C4C4C4',
        width: '100%',
        height: 1,
      }}
    />
  );
}

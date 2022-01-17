import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

export function AppContainer({
  style,
  backgroundColor = '#fff',
  statusTextColor = 'dark',
  children,
}) {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}}>
        <StatusBar
          translucent={true}
          backgroundColor={backgroundColor}
          barStyle={
            statusTextColor === 'dark' ? 'dark-content' : 'light-content'
          }
        />

        <View style={[{padding: 20}, style]}>{children}</View>
      </SafeAreaView>
    </>
  );
}

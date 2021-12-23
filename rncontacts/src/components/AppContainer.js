import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

export function AppContainer({style, children}) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[{padding: 20}, style]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

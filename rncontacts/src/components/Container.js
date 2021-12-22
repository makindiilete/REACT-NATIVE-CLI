import React from 'react';
import {ScrollView, View} from 'react-native';

export function Container({style, children}) {
  return (
    <ScrollView>
      <View style={[{padding: 20}, style]}>{children}</View>
    </ScrollView>
  );
}

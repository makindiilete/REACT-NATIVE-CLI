import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <Text>Hello World</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};


export default App;

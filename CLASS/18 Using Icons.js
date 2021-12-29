/*
1-  npm install --save react-native-vector-icons
2-  For ios, run pod install
3-  Run 'npx react-native link react-native-vector-icons' inside d project folder

Android
Option: With Gradle (recommended)
This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

4-  Restart the project in the terminal and for android, start the project via USB and run 'npm run android'
*/

//Contacts.js
import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { AppContainer } from "../components/AppContainer";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const { setOptions, toggleDrawer } = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <MaterialIcons name="menu" size={30} style={{ padding: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <AppContainer style={{ padding: 100 }}>
      <Text>Hi, from contacts</Text>
    </AppContainer>
  );
};

// Adding a drawer menu icon/text

// Method one ==> https://prnt.sc/24zdv80
/*
1-  Identify the screen where U want the drawer menu icon to show and go into the navigator where it is found and configure it
*/
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../constants/routes";
import { Contacts } from "../screens/Contacts";
import { ContactDetail } from "../screens/ContactDetail";
import { CreateContact } from "../screens/CreateContact";
import { Settings } from "../screens/Settings";
import { Text } from "react-native";

const HomeNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={routes.CONTACT}>
      {/*on d left-hand side of the header, d text 'NAV' will appear*/}
      <Stack.Screen
        name={routes.CONTACT}
        component={Contacts}
        options={{ headerLeft: () => <Text style={{ padding: 10 }}>NAV</Text> }}
      />
      <Stack.Screen name={routes.CONTACT_DETAIL} component={ContactDetail} />
      <Stack.Screen name={routes.CREATE_CONTACT} component={CreateContact} />
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

//Method two : - Go into the screen itself and configure the setOptions property of the useNavigation()

//Contacts.js
import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { AppContainer } from "../components/AppContainer";
import { useNavigation } from "@react-navigation/native";

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const { setOptions, toggleDrawer } = useNavigation();
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <Text style={{ padding: 10 }}>NAV</Text>
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

//DrawerNavigator.js
import React from "react";
import routes from "../constants/routes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import { Image, StyleSheet, Text, View } from "react-native";
import { AppContainer } from "../components/AppContainer";
import { colors } from "../assets/themes/colors";
import AppSideMenu from "../components/AppSideMenu";

const DrawerNavigator = (props) => {
  const drawer = createDrawerNavigator();

  const getDrawerContent = (navigation) => {
    return <AppSideMenu navigation={navigation} />;
  };

  return (
    <drawer.Navigator
      drawerType="slide"
      drawerContent={({ navigation }) => getDrawerContent(navigation)}
    >
      {/*D drawer (sidebar) navigator will contain the homenavigator so dt swiping from d side U can access d drawer and closing the drawer we have d HomeNavigator*/}
      <drawer.Screen name={routes.HOME} component={HomeNavigator} />
    </drawer.Navigator>
  );
};

export default DrawerNavigator;

//AppSideMenu
import React, { useEffect } from "react";
import { AppContainer } from "./AppContainer";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "../constants/routes";
import { colors } from "../assets/themes/colors";

const AppSideMenu = ({ navigation }) => {
  const menuItems = [
    {
      icon: <Text style={styles.itemIcon}>T</Text>,
      name: "Settings",
      onPress: () => navigation.navigate(routes.SETTINGS),
    },
    {
      icon: <Text style={styles.itemIcon}>L</Text>,
      name: "Log Out",
      onPress: () => {},
    },
  ];

  return (
    <AppContainer>
      <View>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logoImage}
        />
        {menuItems?.map((item) => (
          <TouchableOpacity
            style={styles.item}
            key={item.name}
            onPress={item.onPress}
          >
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
    alignSelf: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  itemIcon: { color: colors.white, fontSize: 17, fontWeight: "bold" },
});

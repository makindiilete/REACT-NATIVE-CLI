/*
The template used already included all dependencies needed
-   Create a new file 'index.js' inside the navigations folder
*/

//constants/routes.js
export default Object.freeze({
  HOME: "Home",
  CONTACT: "Contact",
  CONTACT_DETAIL: "Contact Detail",
  CREATE_CONTACT: "Create Contact",
  SETTINGS: "Settings",
  LOGIN: "Login",
  SIGN_UP: "Register",
});

//navigations/AppNavContainer.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";

export function AppNavContainer() {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

// navigations/AuthNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../constants/routes";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

const AuthNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SIGN_UP} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

//navigations / DrawerNavigator.js
import React from "react";
import routes from "../constants/routes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";

const DrawerNavigator = (props) => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator>
      {/*D drawer (sidebar) navigator will contain the homenavigator so dt swiping from d side U can access d drawer and closing the drawer we have d HomeNavigator*/}
      <drawer.Screen name={routes.HOME} component={HomeNavigator} />
    </drawer.Navigator>
  );
};

export default DrawerNavigator;

//navigations / HomeNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../constants/routes";
import { Contacts } from "../screens/Contacts";
import { ContactDetail } from "../screens/ContactDetail";
import { CreateContact } from "../screens/CreateContact";
import { Settings } from "../screens/Settings";

const HomeNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={routes.CONTACT}>
      <Stack.Screen name={routes.CONTACT} component={Contacts} />
      <Stack.Screen name={routes.CONTACT_DETAIL} component={ContactDetail} />
      <Stack.Screen name={routes.CREATE_CONTACT} component={CreateContact} />
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

//screens/ContactDetail.js
import { Text, View } from "react-native";
import React from "react";

export const ContactDetail = () => {
  return (
    <View>
      <Text>Hi, from ContactDetail</Text>
    </View>
  );
};

//screens/Contacts.js
import { Text, View } from "react-native";
import React from "react";

export const Contacts = () => {
  return (
    <View>
      <Text>Hi, from contacts</Text>
    </View>
  );
};

//screens/CreateContact.js
import { Text, View } from "react-native";
import React from "react";

export const CreateContact = () => {
  return (
    <View>
      <Text>Hi, from CreateContact</Text>
    </View>
  );
};

//screens/Login.js
import { Text, View } from "react-native";
import React from "react";

export const Login = () => {
  return (
    <View>
      <Text>Hi, from Login</Text>
    </View>
  );
};

//screens/Register.js
import { Text, View } from "react-native";
import React from "react";

export const Register = () => {
  return (
    <View>
      <Text>Hi, from Register</Text>
    </View>
  );
};

//screens/Settings.js
import { Text, View } from "react-native";
import React from "react";

export const Settings = () => {
  return (
    <View>
      <Text>Hi, from Settings</Text>
    </View>
  );
};

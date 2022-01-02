//Logout.js
import React, { useCallback, useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../assets/themes/colors";
import { removeFromStorage } from "../config/storage";
import { AuthContext } from "../context/context";
import { useFocusEffect } from "@react-navigation/native";

export function Logout({ route }) {
  const { user, setUser } = useContext(AuthContext);

  async function logout() {
    setUser(null);
    await removeFromStorage("user");
    await removeFromStorage("token");
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
    justifyContent: "center",
    alignItems: "center",
  },
});

//routes.js
export default Object.freeze({
  HOME: "Home",
  CONTACT: "Contact",
  CONTACT_DETAIL: "Contact Detail",
  CREATE_CONTACT: "Create Contact",
  SETTINGS: "Settings",
  LOGIN: "Login",
  LOGOUT: "Logout",
  SIGN_UP: "Register",
});

//HomeNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../constants/routes";
import { Contacts } from "../screens/Contacts";
import { ContactDetail } from "../screens/ContactDetail";
import { CreateContact } from "../screens/CreateContact";
import { Settings } from "../screens/Settings";
import { Logout } from "../screens/Logout";

const HomeNavigator = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={routes.CONTACT}>
      {/*on d left-hand side of the header, d text 'NAV' will appear*/}
      <Stack.Screen name={routes.CONTACT} component={Contacts} />
      <Stack.Screen name={routes.CONTACT_DETAIL} component={ContactDetail} />
      <Stack.Screen name={routes.CREATE_CONTACT} component={CreateContact} />
      <Stack.Screen name={routes.SETTINGS} component={Settings} />
      <Stack.Screen name={routes.LOGOUT} component={Logout} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

//Client.js
import { create } from "apisauce";
import { envs } from "../config/env";
import * as storage from "../config/storage";
import { navigate } from "../navigations/RootNavigator";
import routes from "../constants/routes";
import { removeFromStorage } from "../config/storage";
import { Alert } from "react-native";

const apiClient = create({
  baseURL: envs().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  //Now we can make use of our navigate method here without importing any hook
  // navigate(routes.CREATE_CONTACT, {title: 'Michaelz'});
  let authToken = await storage.getToken();
  authToken = JSON.parse(authToken)?.value;
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  request.timeout = 15000;
});

// response interceptor to logout if we get 403 error (Invalid token or token not present)
apiClient.addAsyncResponseTransform(async (response) => {
  if (response.problem === "TIMEOUT_ERROR") {
    Alert.alert(
      "Oops",
      "Request taking too long, check your internet connection"
    );
  }
  if (response.status === 403) {
    navigate(routes.LOGOUT, { tokenExpired: true });
    await removeFromStorage("user");
    await removeFromStorage("token");
  } else {
    console.log("Proceed omo olope");
  }
});

export default apiClient;

/*
We already know how we can navigate from one screen to another but how can we navigate from our axios interceptor component to the login screen anytime we have an error??
*/

//RootNavigator.js
import React from "react";

export const navigationRef = React.createRef();

/*we will be using this navigate method inside functions where we do not have access to the useNavigation hook */
export const navigate = (screenName, params) => {
  navigationRef.current?.navigate(screenName, params);
};

//AppNavContainer.js
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { AuthContext } from "../context/context";
import { getFromStorage } from "../config/storage";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../assets/themes/colors";
import { navigationRef } from "./RootNavigator";

export function AppNavContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const getUser = async () => {
    setIsLoading(true);
    const user = await getFromStorage("user");
    console.log("User is here = ", user);
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    /*ds ref we create here allows us to be able to use our RootNavigator.js to navigate from components that doesnt have the useNavigation hook*/
    <NavigationContainer ref={navigationRef}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : user ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

//client.js
import { create } from "apisauce";
import { envs } from "../config/env";
import * as storage from "../config/storage";
import { navigate } from "../navigations/RootNavigator";
import routes from "../constants/routes";

const apiClient = create({
  baseURL: envs().apiUrl,
});

apiClient.addAsyncRequestTransform(async (request) => {
  //Now we can make use of our navigate method here without importing any hook
  navigate(routes.CREATE_CONTACT, { title: "Michaelz" });
  let authToken = await storage.getToken();
  authToken = JSON.parse(authToken)?.value;
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
});

export default apiClient;

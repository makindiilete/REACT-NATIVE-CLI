//AppNavContainer.js
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { AuthContext } from "../context/context";
import { getFromStorage } from "../config/storage";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../assets/themes/colors";

export function AppNavContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const getUser = async () => {
    setIsLoading(true);
    const user = await getFromStorage("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <NavigationContainer>
          {isLoggedIn || user ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  );
}

//AppSideMenu
import React, { useContext, useEffect } from "react";
import { AppContainer } from "./AppContainer";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "../constants/routes";
import { colors } from "../assets/themes/colors";
import { removeFromStorage } from "../config/storage";
import { AuthContext } from "../context/context";

const AppSideMenu = ({ navigation }) => {
  // const {toggleDrawer} = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const menuItems = [
    {
      icon: <Text style={styles.itemIcon}>T</Text>,
      name: "Settings",
      onPress: () => navigation.navigate(routes.SETTINGS),
    },
    {
      icon: <Text style={styles.itemIcon}>L</Text>,
      name: "Log Out",
      onPress: () => {
        navigation.toggleDrawer();
        Alert.alert("Logout!", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            style: "destructive",
          },
          {
            text: "Ok",
            onPress: async () => {
              setUser(null);
              await removeFromStorage("user");
              await removeFromStorage("token");
            },
          },
        ]);
      },
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

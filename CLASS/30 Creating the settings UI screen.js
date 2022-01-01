//Settings.js
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppMsgComponent from "../components/AppMsgComponent";
import { AppContainer } from "../components/AppContainer";
import { colors } from "../assets/themes/colors";
import AppIcon from "../components/AppIcon";

const settingsOptions = [
  { title: "My Info", subtitle: "Setup your profile" },
  { title: "Accounts", subtitle: null },
  {
    title: "Default account for new contacts",
    subtitle: "akindiileteforex@gmail.com",
  },
  { title: "Contacts to display", subtitle: "All contacts" },
  { title: "Sort by", subtitle: "Last Name" },
  { title: "Name format", subtitle: "Last Name first" },
  { title: "Import", subtitle: null },
  { title: "Export", subtitle: null },
  { title: "Blocked numbers", subtitle: null },
  { title: "About Contacts", subtitle: null },
];
export const Settings = () => {
  const renderItem = ({ item }) => {
    const { title, subtitle } = item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <AppContainer>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.title)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 50 }} />}
        style={{ minHeight: "100%" }}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    marginVertical: 10,
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  title: {
    fontSize: 17,
    marginBottom: 10,
  },
  subtitle: {
    opacity: 0.6,
  },
});

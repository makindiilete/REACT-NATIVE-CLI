/*
When user clicks on the 'Sort By' item on our list, we want to show a modal allowing them to select whether they want to sort by last name or first name and anyone they select, we render a check icon infront of the text, we then store that value in async storage so we can update the list
*/

//Settings.js
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppMsgComponent from "../components/AppMsgComponent";
import { AppContainer } from "../components/AppContainer";
import { colors } from "../assets/themes/colors";
import AppIcon from "../components/AppIcon";
import { getFromStorage, storeToStorage } from "../config/storage";
import AppModal from "../components/AppModal";

export const Settings = () => {
  const [email, setEmail] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [defaultSort, setDefaultSort] = useState("lastname");

  const settingsOptions = [
    { title: "My Info", subtitle: "Setup your profile" },
    { title: "Accounts", subtitle: null },
    {
      title: "Default account for new contacts",
      subtitle: email,
      onPress: () => {},
    },
    { title: "Contacts to display", subtitle: "All contacts" },
    {
      title: "Sort by",
      subtitle: defaultSort === "lastname" ? "Last Name" : "First Name",
      onPress: () => setShowSortModal(true),
    },
    { title: "Name format", subtitle: "Last Name first" },
    { title: "Import", subtitle: null, onPress: () => {} },
    { title: "Export", subtitle: null, onPress: () => {} },
    { title: "Blocked numbers", subtitle: null },
    { title: "About Contacts", subtitle: null },
  ];

  const getSettings = async () => {
    const user = await getFromStorage("user");
    const sort = await getFromStorage("defaultSort");
    setDefaultSort(sort);
    setEmail(user?.email);
  };

  useEffect(() => {
    getSettings();
  }, []);

  const renderItem = ({ item }) => {
    const { title, subtitle, onPress } = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPress && onPress}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </TouchableOpacity>
    );
  };

  const sortByContent = () => {
    return (
      <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={async () => {
            setDefaultSort("lastname");
            await storeToStorage("defaultSort", "lastname");
            setShowSortModal(false);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppIcon
            type="AntDesign"
            name="check"
            size={14}
            color={defaultSort === "lastname" ? "black" : "white"}
          />
          <Text style={{ paddingVertical: 10, fontSize: 16, paddingLeft: 10 }}>
            Last Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setDefaultSort("firstname");
            await storeToStorage("defaultSort", "firstname");
            setShowSortModal(false);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppIcon
            type="AntDesign"
            name="check"
            size={14}
            color={defaultSort === "lastname" ? "white" : "black"}
          />
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 16,
              paddingLeft: 10,
            }}
          >
            First Name
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppModal
        modalTitle="Sort By"
        modalFooter={<></>}
        modalVisible={showSortModal}
        setModalVisible={() => setShowSortModal(!showSortModal)}
        modalBody={sortByContent()}
        closeOnTouchOutside={false}
      />
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

//AppModal.js
import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppContainer } from "./AppContainer";
import { colors } from "../assets/themes/colors";
import AppIcon from "./AppIcon";

const AppModal = ({
  modalVisible,
  modalTitle = "Title",
  modalBody,
  modalFooter,
  setModalVisible,
  closeOnTouchOutside = true,
}) => {
  return (
    <>
      <Modal onDismiss={setModalVisible} visible={modalVisible} transparent>
        <Pressable
          onPress={() => {
            if (closeOnTouchOutside) {
              setModalVisible();
            }
          }}
          style={styles.container}
        >
          <View style={styles.modalArea}>
            <ScrollView>
              <View style={styles.header}>
                <Pressable onPress={setModalVisible}>
                  <AppIcon
                    type="AntDesign"
                    name="close"
                    size={15}
                    style={{ marginRight: 20 }}
                  />
                </Pressable>
                <Text style={styles.header__content}>{modalTitle}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.body__content}>{modalBody}</Text>
              </View>
              {modalFooter ? (
                modalFooter
              ) : (
                <View style={styles.footer}>
                  <Text style={styles.footer__content}>Privacy Policy</Text>
                  <Text style={styles.footer__content}>-</Text>
                  <Text style={styles.footer__content}>Terms of Service</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalArea: {
    backgroundColor: colors.white,
    minHeight: 300,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#c4c4c4",
    paddingBottom: 10,
  },
  body: {
    minHeight: 250,
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#c4c4c4",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header__content: { fontSize: 21 },
  body__content: undefined,
  footer__content: undefined,
});

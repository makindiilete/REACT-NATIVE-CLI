//AppModal.js
import React, { useEffect } from "react";
import {
  Modal,
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
}) => {
  return (
    <>
      <Modal onDismiss={setModalVisible} visible={modalVisible} transparent>
        <TouchableOpacity onPress={setModalVisible} style={styles.container}>
          <View style={styles.modalArea}>
            <ScrollView>
              <View style={styles.header}>
                <AppIcon
                  type="AntDesign"
                  name="close"
                  size={15}
                  style={{ marginRight: 20 }}
                />
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
        </TouchableOpacity>
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
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
  body: {
    minHeight: 250,
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header__content: { fontSize: 21 },
  body__content: undefined,
  footer__content: undefined,
});

//Contacts.js
import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AppIcon from "../components/AppIcon";
import AppModal from "../components/AppModal";
import { AppButton } from "../components/AppButton";
import { colors } from "../assets/themes/colors";

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const { setOptions, toggleDrawer } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <AppIcon
            type="MaterialIcons"
            name="menu"
            size={30}
            style={{ padding: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <AppContainer style={{ padding: 100 }}>
      <AppButton
        primary
        onPress={() => setModalVisible(true)}
        title="Show Modal"
      />
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        modalTitle="My Profile!"
        modalBody="Hello from the modal"
        modalFooter={<></>}
      />
    </AppContainer>
  );
};

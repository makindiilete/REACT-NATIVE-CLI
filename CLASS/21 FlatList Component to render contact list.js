//Contacts.js
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AppIcon from "../components/AppIcon";
import AppModal from "../components/AppModal";
import { AppButton } from "../components/AppButton";
import { colors } from "../assets/themes/colors";
import AppMsgComponent from "../components/AppMsgComponent";
import { getContactsService } from "../api/contacts";
import { getToken } from "../config/storage";

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const { setOptions, toggleDrawer } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [tokenAvailable, setTokenAvailable] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    await getToken();
    const response = await getContactsService();
    if (response.ok) {
      setContacts(response?.data);
    } else {
      Alert.alert("Oops", response?.data?.detail || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const renderItem = ({ item }) => {
    const {
      contact_picture,
      country_code,
      first_name,
      id,
      is_favorite,
      last_name,
      phone_number,
    } = item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View>
          {contact_picture ? (
            <Image
              source={{ uri: contact_picture }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: colors.grey,
              }}
            />
          )}
        </View>
        <View>
          <Text> {`${first_name} ${last_name}`} </Text>
        </View>
        <View>
          <Text> {phone_number} </Text>
        </View>
        <AppIcon type="AntDesign" name="right" />
      </TouchableOpacity>
    );
  };
  return (
    <AppContainer>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        modalTitle="My Profile!"
        modalBody="Hello from the modal"
        modalFooter={<></>}
      />
      {/*
ListFooterComponent : - We use ds to create some space at the bottom of our list
*/}
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          !isLoading &&
          contacts?.length === 0 && (
            <AppMsgComponent secondary message="No contacts to show" />
          )
        }
        ListFooterComponent={<View style={{ height: 50 }} />}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

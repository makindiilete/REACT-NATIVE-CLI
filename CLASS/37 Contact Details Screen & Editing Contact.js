//ContactDetail.js
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AppIcon from "../components/AppIcon";
import { AppContainer } from "../components/AppContainer";
import { AppDivider } from "../navigations/AppDivider";
import { colors } from "../assets/themes/colors";
import { AppButton } from "../components/AppButton";
import routes from "../constants/routes";
import { AppImage } from "../navigations/AppImage";
import { DEFAULT_IMAGE_URI } from "../constants/general";
import { deleteContactService, updateContactService } from "../api/auth";

export const ContactDetail = ({ route }) => {
  const {
    contact_picture,
    country_code,
    first_name,
    id,
    is_favorite,
    last_name,
    phone_number,
  } = route.params;
  const { setOptions, toggleDrawer, navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const updateFav = async () => {
    setIsLoading(true);
    await updateContactService(id, {
      ...route.params,
      is_favorite: !is_favorite,
    });
    setIsLoading(false);
    navigate(routes.CONTACT);
  };

  const deleteContact = async () => {
    setIsLoading(true);
    await deleteContactService(id);
    setIsLoading(false);
    navigate(routes.CONTACT);
  };

  useEffect(() => {
    setOptions({
      headerTitle: () => (
        <Text
          style={styles.navTitle}
          numberOfLines={1}
        >{`${first_name} ${last_name}`}</Text>
      ),
      headerRight: () => (
        <View style={styles.navItems}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Confirm",
                is_favorite ? "Remove from favorite?" : "Add to favorite?",
                [
                  {
                    text: "Cancel",
                    style: "destructive",
                  },
                  {
                    text: is_favorite ? "Remove" : "Add",
                    onPress: () => {
                      updateFav();
                    },
                  },
                ]
              );
            }}
          >
            <AppIcon
              type="AntDesign"
              name={is_favorite ? "star" : "staro"}
              size={20}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Confirm", `Delete ${last_name} ${first_name}?`, [
                {
                  text: "Cancel",
                  style: "destructive",
                },
                {
                  text: "Delete",
                  onPress: () => {
                    deleteContact();
                  },
                },
              ]);
            }}
          >
            <AppIcon
              type="Entypo"
              name="trash"
              size={20}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  function sendSms() {
    const operator = Platform.select({ ios: "&", android: "?" });
    // Linking.openURL(`sms:${operator}body=${options.title}`);
    Linking.openURL(`sms:+${country_code}${phone_number}`);
  }

  function sendWhatsapp() {
    let url =
      "whatsapp://send?text=" + " " + "&phone=+" + country_code + phone_number;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened successfully " + data); //<---Success
      })
      .catch(() => {
        Alert.alert("Oops!", "Make sure WhatsApp installed on your device"); //<---Error
      });
  }

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <AppImage uri={contact_picture || DEFAULT_IMAGE_URI} />
          <AppContainer>
            <ScrollView>
              <Text
                style={styles.title}
                numberOfLines={1}
              >{`${first_name} ${last_name}`}</Text>
              <AppDivider />
              <View style={styles.icons}>
                <TouchableOpacity
                  style={styles.icon__content}
                  onPress={() =>
                    Linking.openURL(`tel:+${country_code}${phone_number}`)
                  }
                >
                  <AppIcon
                    type="FontAwesome"
                    name="phone"
                    size={25}
                    style={{ paddingBottom: 10 }}
                    color={colors.primary}
                  />
                  <Text style={[styles.text, styles.text__primary]}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon__content}
                  onPress={sendSms}
                >
                  <AppIcon
                    type="MaterialIcons"
                    name="textsms"
                    size={25}
                    style={{ paddingBottom: 10 }}
                    color={colors.primary}
                  />
                  <Text style={[styles.text, styles.text__primary]}>Text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon__content}>
                  <AppIcon
                    type="FontAwesome5"
                    name="video"
                    size={25}
                    style={{ paddingBottom: 10 }}
                    color={colors.primary}
                  />
                  <Text style={[styles.text, styles.text__primary]}>Video</Text>
                </TouchableOpacity>
              </View>
              <AppDivider />
              <View style={styles.mobileSection}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    Linking.openURL(`tel:+${country_code}${phone_number}`)
                  }
                >
                  <AppIcon
                    type="FontAwesome"
                    name="phone"
                    size={25}
                    style={{ paddingBottom: 10, opacity: 0.6, marginRight: 20 }}
                  />
                  <View>
                    <Text style={styles.text}>{phone_number}</Text>
                    <Text style={styles.text}>Mobile</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    <AppIcon
                      type="FontAwesome5"
                      name="video"
                      size={25}
                      style={{ paddingBottom: 10, marginRight: 20 }}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={sendSms}>
                    <AppIcon
                      type="MaterialIcons"
                      name="textsms"
                      size={25}
                      style={{ paddingBottom: 10 }}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <AppDivider />
              <TouchableOpacity style={styles.skype} onPress={sendWhatsapp}>
                <AppIcon
                  type="FontAwesome5Brands"
                  name="whatsapp"
                  size={25}
                  style={{ marginRight: 20 }}
                  color="green"
                />
                <Text
                  style={styles.text}
                >{`Whatsapp +${country_code}${phone_number}`}</Text>
              </TouchableOpacity>
              <AppDivider />
              <AppButton
                primary
                title="EDIT CONTACT"
                style={styles.button}
                onPress={() => navigate(routes.CREATE_CONTACT, route.params)}
              />
            </ScrollView>
          </AppContainer>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navItems: {
    flexDirection: "row",
  },
  navTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  title: {
    fontSize: 21,
    marginBottom: 25,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
  },
  icon__content: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 17,
  },
  text__primary: {
    color: colors.primary,
  },
  mobileSection: {
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skype: {
    flexDirection: "row",
    paddingVertical: 30,
  },
  button: {
    width: 200,
    marginTop: 40,
    alignSelf: "flex-end",
  },
});

//CreateContact.js
import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { AppContainer } from "../components/AppContainer";
import { AppTextInput } from "../components/AppTextInput";
import { AppButton } from "../components/AppButton";
import { DEFAULT_IMAGE_URI } from "../constants/general";
import { colors } from "../assets/themes/colors";
import {
  createContactService,
  signupService,
  updateContactService,
} from "../api/auth";
import routes from "../constants/routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AppMsgComponent from "../components/AppMsgComponent";
import { AppImagePicker } from "../components/AppImagePicker";
import { uploadToServer } from "../api/uploadImage";
import { countryCodes } from "../constants/countryCodes";

export const CreateContact = ({ route }) => {
  console.log("Contact details = ", route.params);
  const {
    contact_picture,
    country_code,
    first_name,
    id,
    is_favorite,
    last_name,
    phone_number,
  } = route.params;
  const sheetRef = useRef();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    first_name: first_name || null,
    last_name: last_name || null,
    phone_number: phone_number || null,
    country_code: country_code || null,
    is_favorite: is_favorite || false,
    contact_picture: contact_picture || null,
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [errors, setErrors] = useState({
    first_name: null,
    last_name: null,
    phone_number: null,
  });

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      const code = countryCodes.find((v) => v.value === `+${country_code}`);
      setCountryCode(code?.key?.toUpperCase());
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const onFileSelected = (image) => {
    console.log("Selected = ", image);
    //sourceURL & path available on ios
    // path only available on android
    const { sourceURL, path } = image;
    console.log("Selected image : ", sourceURL);
    setImageUri(path);
    setForm({ ...form, contact_picture: path });
    sheetRef.current?.close();
  };

  const handleChangeText = (name, text) => {
    //Remove error validation as user starts typing for the current input
    setErrors({ ...errors, [name]: null });
    setServerErrors({});
    setDisableBtn(false);
    if (text?.length < 1) {
      setDisableBtn(true);
      setErrors({ ...errors, [name]: `Please add a minimum of 2 characters` });
    }

    if (text?.length > 30) {
      setDisableBtn(true);
      setErrors({
        ...errors,
        [name]: `${name} cannot be greater than 30 characters`,
      });
    }

    //If user wipe out all the characters, we re-show the error validation
    if (text?.length === 0) {
      setDisableBtn(true);
      setErrors({ ...errors, [name]: `Please add a ${name}` });
    }
    setForm({ ...form, [name]: text });
  };

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setForm({ ...form, country_code: country?.callingCode[0] });
  };

  const submit = async () => {
    let errorObj = {};
    if (!form.first_name) {
      setDisableBtn(true);
      errorObj.first_name = "Please add a first name";
    }
    if (!form.last_name) {
      setDisableBtn(true);
      errorObj.last_name = "Please add a last name";
    }
    if (!form.phone_number) {
      setDisableBtn(true);
      errorObj.phone_number = "Please add a phone number";
    }
    setErrors(errorObj);
    //if there are no errors
    if (Object.values(errorObj).length === 0) {
      setIsLoading(true);
      let imgToUse;
      if (imageUri) {
        imgToUse = await uploadToServer(imageUri);
      }
      console.log("Submitting ds form = ", form);
      let response;
      if (id) {
        if (!imageUri) {
          response = await updateContactService(id, {
            id: id,
            first_name: form.first_name,
            last_name: form.last_name,
            phone_number: form.phone_number,
            country_code: form.country_code,
            is_favorite: form.is_favorite,
          });
        } else {
          response = await updateContactService(id, {
            ...form,
            id: id,
            contact_picture: imgToUse,
          });
        }
      } else {
        console.log("Creating contact");
        response = await createContactService({
          ...form,
          contact_picture: imgToUse,
        });
      }

      setIsLoading(false);
      if (response.ok) {
        navigation.navigate(routes.CONTACT);
        navigation.navigate(routes.CONTACT_DETAIL, response?.data);
      } else {
        if (response?.data) {
          let err = {};
          for (const index in Object.keys(response?.data)) {
            err[Object.keys(response.data)[index]] = Object.values(
              response?.data
            )[index][0];
          }
          setServerErrors(err);
        } else {
          setServerErrors(response?.details || "Something went wrong!");
        }
      }
    }
  };

  const toggleSwitch = (value) => {
    console.log("Switch value = ", value);
    setForm({ ...form, is_favorite: value });
  };

  const Picker = () => {
    return (
      /*
              withFilter : - Ds enables search
              withFlag : - ds renders flags of each country
              withCallingCode : - ds enables d calling code of each country e.g +234 for nigeria
              withEmoji : - ds makes d flags curvy
              onSelect : - ds gets called when U select a country
              withCallingCodeButton : - ds shows calling code e.g. +234 infront of d phone number input
              */
      <CountryPicker
        withFilter
        withFlag
        withCountryNameButton={false}
        withCallingCode
        withCallingCodeButton
        withEmoji
        onSelect={onSelect}
        countryCode={countryCode}
      />
    );
  };

  return (
    <AppContainer>
      <View>
        <Image
          source={{ uri: form.contact_picture || DEFAULT_IMAGE_URI }}
          style={styles.imageView}
        />
        {/*Onpress of d choose image text, we open the picker*/}
        <TouchableOpacity onPress={() => sheetRef.current?.open()}>
          <Text style={styles.imageText}>Choose Image</Text>
        </TouchableOpacity>
        {typeof serverErrors === "string" && (
          <AppMsgComponent message={serverErrors} danger />
        )}
        <AppTextInput
          label="First Name"
          value={form.first_name}
          placeholder="Enter first name"
          handleChangeText={(e) => handleChangeText("first_name", e)}
          error={errors.first_name || serverErrors?.first_name}
        />
        <AppTextInput
          label="Last Name"
          value={form.last_name}
          placeholder="Enter last name"
          handleChangeText={(e) => handleChangeText("last_name", e)}
          error={errors.last_name || serverErrors?.last_name}
        />
        <AppTextInput
          keyboardType="phone-pad"
          label="Phone Number"
          value={form.phone_number}
          placeholder="Enter phone number"
          handleChangeText={(e) => handleChangeText("phone_number", e)}
          error={errors.phone_number || serverErrors?.phone_number}
          icon={<Picker />}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={{ marginRight: 10, fontSize: 17 }}>Add to favorite</Text>
          <Switch
            trackColor={{ false: "#c4c4c4", true: colors.primary }}
            thumbColor="#fff"
            ios_backgroundColor="#c4c4c4"
            onValueChange={toggleSwitch}
            value={form.is_favorite}
          />
        </View>
        <AppButton
          title="Submit"
          primary
          loading={isLoading}
          disabled={isLoading}
          onPress={submit}
        />
      </View>
      {/*We forward our ref as props to d ImagePicker component*/}
      <AppImagePicker ref={sheetRef} onFileSelected={onFileSelected} />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  imageView: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
  },
  imageText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.primary,
  },
});

//AppImage.js
import React, { useState } from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { colors } from "../assets/themes/colors";

export function AppImage({ uri, style }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      {isLoading && (
        <View
          style={{
            marginVertical: "20%",
            marginHorizontal: "35%",
            marginBottom: -170,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <Image
        source={{ uri: uri }}
        style={[styles.image, style]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
});

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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AppIcon from "../components/AppIcon";
import AppModal from "../components/AppModal";
import { AppButton } from "../components/AppButton";
import { colors } from "../assets/themes/colors";
import AppMsgComponent from "../components/AppMsgComponent";
import { getContactsService } from "../api/contacts";
import { getFromStorage, getToken, removeFromStorage } from "../config/storage";
import routes from "../constants/routes";
import { AuthContext } from "../context/context";

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const { setOptions, toggleDrawer, navigate } = useNavigation();

  const [defaultSort, setDefaultSort] = useState("lastname");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [tokenAvailable, setTokenAvailable] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    await getToken();
    const sort = await getFromStorage("defaultSort");
    const response = await getContactsService();
    if (response.ok) {
      if (sort === "lastname") {
        response?.data.sort(function (first, second) {
          if (first.first_name < second.first_name) return -1;
          if (first.first_name > second.first_name) return 1;
          return 0;
        });
      } else {
        response?.data.sort(function (first, second) {
          if (first.last_name < second.last_name) return -1;
          if (first.last_name > second.last_name) return 1;
          return 0;
        });
      }
      setContacts(response?.data);
    } else {
      if (response.status !== 403) {
        Alert.alert("Oops", response?.data?.detail || "Something went wrong");
      }
    }
    setIsLoading(false);
  };

  const getSettings = async () => {
    const sort = await getFromStorage("defaultSort");
    setDefaultSort(sort);
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      fetchContacts();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

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
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigate(routes.CONTACT_DETAIL, item)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: colors.grey,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {`${first_name[0]} ${last_name[0]}`}
                </Text>
              </View>
            )}
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text numberOfLines={1} style={{ fontSize: 17 }}>
              {`${first_name} ${last_name}`}{" "}
            </Text>
            <Text style={{ fontSize: 14, opacity: 0.7 }}>
              {`${country_code} ${phone_number}`}{" "}
            </Text>
          </View>
        </View>
        <AppIcon type="AntDesign" name="right" size={18} color={colors.grey} />
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
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchContacts()}
        ListEmptyComponent={
          !isLoading &&
          contacts?.length === 0 && (
            <AppMsgComponent secondary message="No contacts to show" />
          )
        }
        ListFooterComponent={<View style={{ height: 50 }} />}
        style={{ minHeight: "100%" }}
      />

      <TouchableOpacity
        style={styles.floatingActionBtn}
        onPress={() => navigate(routes.CREATE_CONTACT, {})}
      >
        <AppIcon
          name="plus"
          color={colors.white}
          size={21}
          type="FontAwesome5"
        />
      </TouchableOpacity>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  floatingActionBtn: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
    bottom: 45,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

//Auth.js
import apiClient from "./client";

export const signupService = (data) => {
  return apiClient.post("/auth/register", data);
};

export const createContactService = (data) => {
  return apiClient.post(`/contacts/`, data);
};

export const updateContactService = (id, data) => {
  return apiClient.put(`/contacts/${id}`, data);
};

export const deleteContactService = (id) => {
  return apiClient.delete(`/contacts/${id}`);
};

export const loginService = (data) => apiClient.post("auth/login", data);

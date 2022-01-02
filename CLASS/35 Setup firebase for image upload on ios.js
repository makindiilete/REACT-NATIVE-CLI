/*
1-  Create a project on firebase console
2-  Next we will be using a firebase plugin from https://rnfirebase.io/
3-  Install the firebase plugin for react native from npm install --save @react-native-firebase/app@8.0.0


IOS
1-  Run pod install
2-  Go back to firebase >> Add an app >> Select ios >> Enter your app bundle id
        To gt ur bundle id from xcode >> select ur project name folder >> copy the bundle id
3-  Click continue till the end
4-  Go back to xcode >> Right-click on your project folder >> 'Add files to rncontacts'
5-  Inside 'AppDelegate.m' inside xcode, before '#ifdef FB_SONARKIT_ENABLED',  add '#import <Firebase.h>'

NEXT CLOUD STORAGE (https://rnfirebase.io/storage/usage)
1-  Go back to firebase >> Click on Storage >> Get Started >> Click Next and Next to create a bucket
2-  After the bucket has been created, we need to edit the rules from the default (Firebase checks for user authentication but our authentication is not on firebase so we cant use ds) to allow any user read and write from ds bucket by using the syntax ' allow read, write: if true;' then publish
3-  Inside your ios folder, run the command 'npm i @react-native-firebase/storage@7.1.7 && pod install' >> ds add the firebase storage plugin and then run pod install
*/

//uploadImage.js
import storage from "@react-native-firebase/storage";
import { Alert } from "react-native";

/*
file => method param
onSuccess => a success callback fn
onError => an error callback fn
*/
export const uploadToServer = async (file) => {
  console.log("This file was sent to server = ", file);
  /*d path on firebase to store d image. Here 'user' will soon change to b dynamic and '777' will soon change to d user phone number*/
  // file.creationDate is added to make the image path unique
  // const path = 'contact-pictures/user/777/' + file + new Date.now();
  const path = `contact-pictures/user/777/${Date.now()}`;
  console.log("Path to be used = ", path);
  const ref = storage()?.ref(path);

  try {
    await ref?.putFile(file);
    return await ref?.getDownloadURL();
  } catch (error) {
    Alert.alert("Oops", "Something went wrong!");
    return error;
  }
};

//CreateContact.js
import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { AppContainer } from "../components/AppContainer";
import { AppTextInput } from "../components/AppTextInput";
import { AppButton } from "../components/AppButton";
import { DEFAULT_IMAGE_URI } from "../constants/general";
import { colors } from "../assets/themes/colors";
import { createContactService, signupService } from "../api/auth";
import routes from "../constants/routes";
import { useNavigation } from "@react-navigation/native";
import AppMsgComponent from "../components/AppMsgComponent";
import { AppImagePicker } from "../components/AppImagePicker";
import { uploadToServer } from "../api/uploadImage";

export const CreateContact = () => {
  const sheetRef = useRef();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState({
    first_name: null,
    last_name: null,
    phone_number: null,
    country_code: null,
    is_favorite: false,
    contact_picture: null,
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [errors, setErrors] = useState({
    first_name: null,
    last_name: null,
    phone_number: null,
  });

  const onFileSelected = (image) => {
    console.log("Selected = ", image);
    //sourceURL & path available on ios
    // path only available on android
    const { sourceURL, path } = image;
    console.log("Selected image : ", sourceURL);
    setImageUri(path);
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
      const imgToUse = await uploadToServer(imageUri);
      if (imgToUse) {
        form.contact_picture = imgToUse;
        console.log("Submitting ds form = ", form);
        const response = await createContactService(form);
        setIsLoading(false);
        if (response.ok) {
          navigation.navigate(routes.CONTACT);
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
          source={{ uri: imageUri || DEFAULT_IMAGE_URI }}
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

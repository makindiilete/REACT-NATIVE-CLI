//CreateContact.js
import { Text, View, StyleSheet, Image, Switch } from "react-native";
import React, { useState } from "react";
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

export const CreateContact = () => {
  const navigation = useNavigation();
  const [disableBtn, setDisableBtn] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log("Country = ", country);
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
      console.log("Sending form ", form);
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
        <Image source={{ uri: DEFAULT_IMAGE_URI }} style={styles.imageView} />
        <Text style={styles.imageText}>Choose Image</Text>
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

import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';
import {AppButton} from '../components/AppButton';
import {DEFAULT_IMAGE_URI} from '../constants/general';
import {colors} from '../assets/themes/colors';
import {
  createContactService,
  signupService,
  updateContactService,
} from '../api/auth';
import routes from '../constants/routes';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AppMsgComponent from '../components/AppMsgComponent';
import {AppImagePicker} from '../components/AppImagePicker';
import {uploadToServer} from '../api/uploadImage';
import {countryCodes} from '../constants/countryCodes';

export const CreateContact = ({route}) => {
  console.log('Contact details = ', route.params);
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
    }, []),
  );

  const onFileSelected = (image) => {
    console.log('Selected = ', image);
    //sourceURL & path available on ios
    // path only available on android
    const {sourceURL, path} = image;
    console.log('Selected image : ', sourceURL);
    setImageUri(path);
    setForm({...form, contact_picture: path});
    sheetRef.current?.close();
  };

  const handleChangeText = (name, text) => {
    //Remove error validation as user starts typing for the current input
    setErrors({...errors, [name]: null});
    setServerErrors({});
    setDisableBtn(false);
    if (text?.length < 1) {
      setDisableBtn(true);
      setErrors({...errors, [name]: `Please add a minimum of 2 characters`});
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
      setErrors({...errors, [name]: `Please add a ${name}`});
    }
    setForm({...form, [name]: text});
  };

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setForm({...form, country_code: country?.callingCode[0]});
  };

  const submit = async () => {
    let errorObj = {};
    if (!form.first_name) {
      setDisableBtn(true);
      errorObj.first_name = 'Please add a first name';
    }
    if (!form.last_name) {
      setDisableBtn(true);
      errorObj.last_name = 'Please add a last name';
    }
    if (!form.phone_number) {
      setDisableBtn(true);
      errorObj.phone_number = 'Please add a phone number';
    }
    setErrors(errorObj);
    //if there are no errors
    if (Object.values(errorObj).length === 0) {
      setIsLoading(true);
      let imgToUse;
      if (imageUri) {
        imgToUse = await uploadToServer(imageUri);
      }
      console.log('Submitting ds form = ', form);
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
        console.log('Creating contact');
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
              response?.data,
            )[index][0];
          }
          setServerErrors(err);
        } else {
          setServerErrors(response?.details || 'Something went wrong!');
        }
      }
    }
  };

  const toggleSwitch = (value) => {
    console.log('Switch value = ', value);
    setForm({...form, is_favorite: value});
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
          source={{uri: form.contact_picture || DEFAULT_IMAGE_URI}}
          style={styles.imageView}
        />
        {/*Onpress of d choose image text, we open the picker*/}
        <TouchableOpacity onPress={() => sheetRef.current?.open()}>
          <Text style={styles.imageText}>Choose Image</Text>
        </TouchableOpacity>
        {typeof serverErrors === 'string' && (
          <AppMsgComponent message={serverErrors} danger />
        )}
        <AppTextInput
          label="First Name"
          value={form.first_name}
          placeholder="Enter first name"
          handleChangeText={(e) => handleChangeText('first_name', e)}
          error={errors.first_name || serverErrors?.first_name}
        />
        <AppTextInput
          label="Last Name"
          value={form.last_name}
          placeholder="Enter last name"
          handleChangeText={(e) => handleChangeText('last_name', e)}
          error={errors.last_name || serverErrors?.last_name}
        />
        <AppTextInput
          keyboardType="phone-pad"
          label="Phone Number"
          value={form.phone_number}
          placeholder="Enter phone number"
          handleChangeText={(e) => handleChangeText('phone_number', e)}
          error={errors.phone_number || serverErrors?.phone_number}
          icon={<Picker />}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <Text style={{marginRight: 10, fontSize: 17}}>Add to favorite</Text>
          <Switch
            trackColor={{false: '#c4c4c4', true: colors.primary}}
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
    alignSelf: 'center',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
  },
});

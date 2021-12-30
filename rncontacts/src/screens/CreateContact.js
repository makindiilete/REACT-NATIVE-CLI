import {Text, View, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';
import {AppButton} from '../components/AppButton';
import {DEFAULT_IMAGE_URI} from '../constants/general';
import {colors} from '../assets/themes/colors';

export const CreateContact = () => {
  const [countryCode, setCountryCode] = useState('NG');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: null,
    last_name: null,
    phone_number: null,
  });

  const Picker = () => {
    return (
      /*
        withFilter : - Ds enables search
        withFlag : - ds renders flags of each country
        withCallingCode : - ds enables d calling code of each country e.g +234 for nigeria
        withEmoji : - ds makes d flags curvy
        onSelect : - ds gets called when U select a country
        */
      <CountryPicker
        withFilter
        withFlag
        withCountryNameButton={false}
        withCallingCode
        withEmoji
        onSelect={() => {}}
        countryCode={countryCode}
      />
    );
  };

  return (
    <AppContainer>
      <View>
        <Image source={{uri: DEFAULT_IMAGE_URI}} style={styles.imageView} />
        <Text style={styles.imageText}>Choose Image</Text>
        <AppTextInput
          label="First Name"
          value={form.first_name}
          placeholder="Enter first name"
        />
        <AppTextInput
          label="Last Name"
          value={form.last_name}
          placeholder="Enter last name"
        />
        <AppTextInput
          label="Phone Number"
          value={form.phone_number}
          placeholder="Enter phone number"
          icon={<Picker />}
        />
        <AppButton
          title="Submit"
          primary
          loading={isLoading}
          disabled={isLoading}
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
    alignSelf: 'center',
  },
  imageText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
  },
});

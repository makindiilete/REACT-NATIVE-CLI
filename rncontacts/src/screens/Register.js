import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';
import {AppButton} from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import routes from '../constants/routes';
import {colors} from '../assets/themes/colors';
import {envs} from '../config/env';
import apiClient from '../api/client';
import {signupService} from '../api/auth';
import AppMsgComponent from '../components/AppMsgComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import AppIcon from '../components/AppIcon';

export const Register = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    email: null,
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    email: null,
  });

  const handleChangeText = (name, text) => {
    //Remove error validation as user starts typing for the current input
    setErrors({...errors, [name]: null});
    setServerErrors({});
    setDisableBtn(false);
    // Check password length validation
    if (name === 'password' && text?.length < 8) {
      setDisableBtn(true);
      setErrors({
        ...errors,
        password: 'Please enter a minimum of 6 characters',
      });
    }

    if (name === 'password' && text?.length > 65) {
      setDisableBtn(true);
      setErrors({
        ...errors,
        password: 'Please enter a maximum of 65 characters',
      });
    }

    if (name === 'email') {
      if (!validateEmail(text)) {
        setDisableBtn(true);
        setErrors({
          ...errors,
          email: 'Please enter a valid email address',
        });
      }
    }

    if (text?.length < 2) {
      setDisableBtn(true);
      setErrors({...errors, [name]: `Please add a minimum of 2 characters`});
    }

    if (text?.length > 150) {
      setDisableBtn(true);
      setErrors({
        ...errors,
        [name]: `${name} cannot be greater than 10 characters`,
      });
    }

    //If user wipe out all the characters, we re-show the error validation
    if (text?.length === 0) {
      setDisableBtn(true);
      setErrors({...errors, [name]: `Please add a ${name}`});
    }
    setForm({...form, [name]: text});
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const submit = async () => {
    let errorObj = {};
    if (!form.username) {
      setDisableBtn(true);
      errorObj.username = 'Please add a username';
    }
    if (!form.password) {
      setDisableBtn(true);
      errorObj.password = 'Please add a password';
    }
    if (!form.first_name) {
      setDisableBtn(true);
      errorObj.first_name = 'Please add a first_name';
    }
    if (!form.last_name) {
      setDisableBtn(true);
      errorObj.last_name = 'Please add a last_name';
    }
    if (!form.email) {
      setDisableBtn(true);
      errorObj.email = 'Please add an email address';
    }
    if (!validateEmail(form.email)) {
      setDisableBtn(true);
      errorObj.email = 'Please add a valid email address';
    }
    setErrors(errorObj);
    //if there are no errors
    if (Object.values(errorObj).length === 0) {
      setIsLoading(true);
      const response = await signupService(form);
      setIsLoading(false);
      if (response.ok) {
        navigation.navigate(routes.LOGIN, {
          registered: true,
          username: response.data?.username,
        });
      } else {
        if (response.data) {
          let err = {};
          for (const index in Object.keys(response?.data)) {
            err[Object.keys(response.data)[index]] = Object.values(
              response?.data,
            )[index][0];
          }
          setServerErrors(err);
        } else {
          setServerErrors('Something went wrong!');
        }
      }
    }
  };

  return (
    <AppContainer>
      <ScrollView keyboardShouldPersistTaps="always">
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
        />
        <View>
          <Text style={styles.title}>Welcome to RNContacts</Text>
          <Text style={styles.subtitle}>Create a free account</Text>
          {typeof serverErrors === 'string' && (
            <AppMsgComponent message={serverErrors} danger />
          )}
          <View style={styles.form}>
            <AppTextInput
              autoCorrect={false}
              autoCapitalize="none"
              label="Username"
              handleChangeText={(e) => handleChangeText('username', e)}
              placeholder="Username"
              value={form.username}
              error={errors.username || serverErrors?.username}
            />
            <AppTextInput
              label="First Name"
              handleChangeText={(e) => handleChangeText('first_name', e)}
              placeholder="first name"
              value={form.first_name}
              error={errors.first_name || serverErrors?.first_name}
            />
            <AppTextInput
              label="Last Name"
              handleChangeText={(e) => handleChangeText('last_name', e)}
              error={errors.last_name || serverErrors?.last_name}
              placeholder="last name"
              value={form.last_name}
            />
            <AppTextInput
              autoCorrect={false}
              autoCapitalize="none"
              label="Email Address"
              handleChangeText={(e) => handleChangeText('email', e)}
              placeholder="email"
              value={form.email}
              error={errors.email || serverErrors?.email}
            />
            <AppTextInput
              label="Password"
              handleChangeText={(e) => handleChangeText('password', e)}
              value={form.password}
              icon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  <AppIcon
                    type="Entypo"
                    name={!showPassword ? 'eye' : 'eye-with-line'}
                    size={20}
                  />
                </TouchableOpacity>
              }
              secureTextEntry={!showPassword}
              iconPosition="Right"
              placeholder="Password"
              error={errors.password || serverErrors?.password}
            />
            <AppButton
              title="Submit"
              primary
              onPress={submit}
              loading={isLoading}
              disabled={disableBtn || isLoading}
            />
            <View style={styles.registerSection}>
              <Text style={styles.registerText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.LOGIN)}>
                <Text style={styles.registerButton}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },
  form: {
    paddingTop: 20,
  },
  registerSection: {
    flexDirection: 'row',
    paddingTop: 10,
    marginBottom: 50,
  },
  registerText: {fontSize: 17},
  registerButton: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },
});

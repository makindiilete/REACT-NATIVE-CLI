import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';
import {AppButton} from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import routes from '../constants/routes';
import {colors} from '../assets/themes/colors';
import AppMsgComponent from '../components/AppMsgComponent';
import {loginService} from '../api/auth';
import {getFromStorage, storeToStorage} from '../config/storage';
import {AuthContext} from '../context/context';
import Entypo from 'react-native-vector-icons/Entypo';
import AppIcon from '../components/AppIcon';

export const Login = ({route}) => {
  const navigation = useNavigation();
  const [showRegSuccess, setShowRegSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: null,
    password: null,
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  useEffect(() => {
    async function storeLogin() {
      const username = await getFromStorage('username');
      const password = await getFromStorage('password');
      setForm({username: username, password: password});
    }
    storeLogin();
  }, []);

  useEffect(() => {
    if (route?.params?.username) {
      setForm({...form, username: route?.params?.username});
    }
    if (route?.params?.registered) {
      setShowRegSuccess(true);
    } else {
      setShowRegSuccess(false);
    }
  }, [route?.params?.registered]);
  const handleChangeText = (name, text) => {
    //Remove error validation as user starts typing for the current input
    setErrors({...errors, [name]: null});

    // Check password length validation
    if (name === 'password' && text?.length < 6) {
      setErrors({
        ...errors,
        password: 'Please enter a minimum of 6 characters',
      });
    }
    //If user wipe out all the characters, we re-show the error validation
    if (text?.length === 0) {
      setErrors({...errors, [name]: `Please add a ${name}`});
    }
    setForm({...form, [name]: text});
  };

  const submit = async () => {
    setShowRegSuccess(false);
    let errorObj = {};
    if (!form.username) {
      errorObj.username = 'Please add a username';
    }
    if (!form.password) {
      errorObj.password = 'Please add a password';
    }
    setErrors(errorObj);
    setIsLoading(true);
    const response = await loginService(form);
    await storeToStorage('username', form.username);
    await storeToStorage('password', form.password);
    setIsLoading(false);
    if (response.ok) {
      await storeToStorage('token', response?.data?.token);
      setUser(response?.data?.user);
      await storeToStorage('user', response?.data?.user);
    } else {
      setServerError(response?.data?.detail);
    }
  };

  return (
    <AppContainer>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subtitle}>Please login here</Text>
        {serverError && (
          <AppMsgComponent
            danger
            message={serverError}
            onDismiss={() => setServerError(null)}
          />
        )}
        {showRegSuccess && (
          <AppMsgComponent
            success
            message="Registration successful"
            onDismiss={() => setShowRegSuccess(false)}
          />
        )}
        <View style={styles.form}>
          <AppTextInput
            autoCorrect={false}
            autoCapitalize="none"
            label="Username"
            handleChangeText={(e) => handleChangeText('username', e)}
            placeholder="Username"
            value={form.username}
            error={errors.username}
          />
          <AppTextInput
            label="Password"
            handleChangeText={(e) => handleChangeText('password', e)}
            value={form.password}
            icon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
            error={errors.password}
          />
          <AppButton
            title="Submit"
            primary
            onPress={submit}
            loading={isLoading}
            disabled={isLoading}
          />
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Need a new account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SIGN_UP)}>
              <Text style={styles.registerButton}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  },
  registerText: {fontSize: 17},
  registerButton: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },
});

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
import React, {useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {AppTextInput} from '../components/AppTextInput';
import {AppButton} from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import routes from '../constants/routes';
import {colors} from '../assets/themes/colors';

export const Login = () => {
  const navigation = useNavigation();
  const [values, setValues] = useState({
    username: null,
    password: null,
  });
  const handleChangeText = (name, text) => {
    setValues({...values, [name]: text});
  };

  const submit = () => {
    console.log(values);
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
        <View style={styles.form}>
          <AppTextInput
            label="Username"
            handleChangeText={(e) => handleChangeText('username', e)}
            placeholder="Username"
            value={values.username}
          />
          <AppTextInput
            label="Password"
            handleChangeText={(e) => handleChangeText('password', e)}
            value={values.password}
            icon={<Text>Show</Text>}
            secureTextEntry={true}
            iconPosition="Right"
            placeholder="Password"
          />
          <AppButton title="Submit" primary onPress={submit} />
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

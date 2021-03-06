//Register.js
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { AppTextInput } from "../components/AppTextInput";
import { AppButton } from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import routes from "../constants/routes";
import { colors } from "../assets/themes/colors";

export const Register = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    email: null,
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    email: null,
  });
  const handleChangeText = (name, text) => {
    //Remove error validation as user starts typing for the current input
    setErrors({ ...errors, [name]: null });
    // Check password length validation
    if (name === "password" && text?.length < 6) {
      setErrors({
        ...errors,
        password: "Please enter a minimum of 6 characters",
      });
    }
    //If user wipe out all the characters, we re-show the error validation
    if (text?.length === 0) {
      setErrors({ ...errors, [name]: `Please add a ${name}` });
    }
    setForm({ ...form, [name]: text });
  };

  const submit = () => {
    let errorObj = {};
    if (!form.username) {
      errorObj.username = "Please add a username";
    }
    if (!form.password) {
      errorObj.password = "Please add a password";
    }
    if (!form.firstname) {
      errorObj.firstname = "Please add a firstname";
    }
    if (!form.lastname) {
      errorObj.lastname = "Please add a lastname";
    }
    if (!form.email) {
      errorObj.email = "Please add an email address";
    }
    setErrors(errorObj);
  };

  return (
    <AppContainer>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subtitle}>Create a free account</Text>
        <View style={styles.form}>
          <AppTextInput
            label="Username"
            handleChangeText={(e) => handleChangeText("username", e)}
            placeholder="Username"
            value={form.username}
            error={errors.username}
          />
          <AppTextInput
            label="First Name"
            handleChangeText={(e) => handleChangeText("firstname", e)}
            placeholder="firstname"
            value={form.firstname}
            error={errors.firstname}
          />
          <AppTextInput
            label="Last Name"
            handleChangeText={(e) => handleChangeText("lastname", e)}
            placeholder="lastname"
            value={form.lastname}
            error={errors.lastname}
          />
          <AppTextInput
            label="Email Address"
            handleChangeText={(e) => handleChangeText("email", e)}
            placeholder="email"
            value={form.email}
            error={errors.email}
          />
          <AppTextInput
            label="Password"
            handleChangeText={(e) => handleChangeText("password", e)}
            value={form.password}
            icon={<Text>Show</Text>}
            secureTextEntry={true}
            iconPosition="Right"
            placeholder="Password"
            error={errors.password}
          />
          <AppButton title="Submit" primary onPress={submit} />
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <Text style={styles.registerButton}>Login</Text>
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
    alignSelf: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 21,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    paddingVertical: 20,
    fontWeight: "500",
  },
  form: {
    paddingTop: 20,
  },
  registerSection: {
    flexDirection: "row",
    paddingTop: 10,
    marginBottom: 50,
  },
  registerText: { fontSize: 17 },
  registerButton: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },
});

//Login.js
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
} from "react-native";
import React, { useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { AppTextInput } from "../components/AppTextInput";
import { AppButton } from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import routes from "../constants/routes";
import { colors } from "../assets/themes/colors";

export const Login = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    username: null,
    password: null,
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });
  const handleChangeText = (name, text) => {
    //Remove error validation as user starts typing for the current input
    setErrors({ ...errors, [name]: null });

    // Check password length validation
    if (name === "password" && text?.length < 6) {
      setErrors({
        ...errors,
        password: "Please enter a minimum of 6 characters",
      });
    }
    //If user wipe out all the characters, we re-show the error validation
    if (text?.length === 0) {
      setErrors({ ...errors, [name]: `Please add a ${name}` });
    }
    setForm({ ...form, [name]: text });
  };

  const submit = () => {
    let errorObj = {};
    if (!form.username) {
      errorObj.username = "Please add a username";
    }
    if (!form.password) {
      errorObj.password = "Please add a password";
    }
    console.log(form);
    setErrors(errorObj);
  };

  return (
    <AppContainer>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logoImage}
      />
      <View>
        <Text style={styles.title}>Welcome to RNContacts</Text>
        <Text style={styles.subtitle}>Please login here</Text>
        <View style={styles.form}>
          <AppTextInput
            label="Username"
            handleChangeText={(e) => handleChangeText("username", e)}
            placeholder="Username"
            value={form.username}
            error={errors.username}
          />
          <AppTextInput
            label="Password"
            handleChangeText={(e) => handleChangeText("password", e)}
            value={form.password}
            icon={<Text>Show</Text>}
            secureTextEntry={true}
            iconPosition="Right"
            placeholder="Password"
            error={errors.password}
          />
          <AppButton title="Submit" primary onPress={submit} />
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>Need a new account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SIGN_UP)}
            >
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
    alignSelf: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 21,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    paddingVertical: 20,
    fontWeight: "500",
  },
  form: {
    paddingTop: 20,
  },
  registerSection: {
    flexDirection: "row",
    paddingTop: 10,
  },
  registerText: { fontSize: 17 },
  registerButton: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },
});

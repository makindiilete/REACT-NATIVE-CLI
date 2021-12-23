/*
We want to create our own custom input that has validation built in
*/

//colors.js
export const colors = {
  primary: "#4361ee",
  secondary: "#3f37c9",
  accent: "#4895ef",
  danger: "#f72585",
  success: "#4cc9f0",
  grey: "#adb5bd",
  white: "#ffffff",
};

//AppTextInput.js
import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors } from "../assets/themes/colors";

export function AppTextInput({
  value,
  handleChangeText,
  style,
  label,
  icon,
  iconPosition,
  error,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const getFlexDirection = () =>
    iconPosition?.toLowerCase() === "right" ? "row-reverse" : "row";

  const getBorderColor = () =>
    focused ? colors.primary : error ? colors.danger : colors.grey;

  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          style,
          { flexDirection: getFlexDirection(), borderColor: getBorderColor() },
        ]}
      >
        <View>{icon && icon}</View>
        <TextInput
          onChangeText={handleChangeText}
          value={value}
          placeholder="Useless Placeholder"
          style={styles.textInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    alignItems: "center",
    marginTop: 5,
  },
  textInput: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 12,
  },
});

//Login.js
import { Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { AppTextInput } from "../components/AppTextInput";

export const Login = () => {
  const [text, setText] = useState(null);
  const handleChangeText = (text) => {
    setText(text);
  };
  return (
    <AppContainer>
      <AppTextInput
        label="Username"
        handleChangeText={handleChangeText}
        value={text}
      />
      <AppTextInput
        label="Password"
        handleChangeText={handleChangeText}
        value={text}
        icon={<Text>Hide</Text>}
        iconPosition="Right"
      />
    </AppContainer>
  );
};

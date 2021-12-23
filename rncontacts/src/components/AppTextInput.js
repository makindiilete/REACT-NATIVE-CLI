import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {colors} from '../assets/themes/colors';

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
    iconPosition?.toLowerCase() === 'right' ? 'row-reverse' : 'row';

  const getBorderColor = () =>
    focused ? colors.primary : error ? colors.danger : colors.grey;

  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          style,
          {flexDirection: getFlexDirection(), borderColor: getBorderColor()},
        ]}>
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
    paddingHorizontal: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  textInput: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 12,
  },
});

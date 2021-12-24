import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../assets/themes/colors';

export function AppButton({
  title,
  primary,
  secondary,
  danger,
  disabled,
  loading,
  onPress,
  ...rest
}) {
  const getBgColor = () => {
    if (loading || disabled) return colors.grey;
    if (primary) return colors.primary;

    if (secondary) return colors.secondary;

    if (danger) return colors.danger;
  };

  const getTextColor = () => (disabled ? 'black' : colors.white);

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={[styles.inputContainer, {backgroundColor: getBgColor()}]}>
      <View>
        {loading ? (
          <ActivityIndicator color={colors.secondary} />
        ) : (
          title && (
            <Text style={[styles.text, {color: getTextColor()}]}>{title}</Text>
          )
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    textAlign: 'center',
  },
});

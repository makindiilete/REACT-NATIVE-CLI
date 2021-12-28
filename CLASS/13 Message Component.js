//AppMessageComponent
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../assets/themes/colors";

const AppMsgComponent = ({
  message,
  primary,
  secondary,
  danger,
  success,
  retry,
  retryFn,
  onDismiss,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const getBgColor = () => {
    if (primary) return colors.primary;

    if (secondary) return colors.secondary;

    if (danger) return colors.danger;
    if (success) return colors.success;
  };

  return (
    <>
      {isDismissed ? null : (
        <TouchableOpacity
          style={[styles.wrapper, { backgroundColor: getBgColor() }]}
        >
          <View style={styles.content}>
            <Text style={{ color: colors.white }}>{message}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {retry && !onDismiss && (
                <TouchableOpacity onPress={retryFn}>
                  <Text style={{ color: colors.white, marginRight: 10 }}>
                    Retry
                  </Text>
                </TouchableOpacity>
              )}
              {onDismiss && (
                <TouchableOpacity onPress={() => setIsDismissed(true)}>
                  <Text style={{ color: colors.white, fontWeight: "bold" }}>
                    x
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppMsgComponent;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

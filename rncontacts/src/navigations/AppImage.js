import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';
import {colors} from '../assets/themes/colors';

export function AppImage({uri, style}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      {isLoading && (
        <View
          style={{
            marginVertical: '20%',
            marginHorizontal: '35%',
            marginBottom: -170,
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <Image
        source={{uri: uri}}
        style={[styles.image, style]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});

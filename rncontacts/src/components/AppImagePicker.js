import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppIcon from './AppIcon';
import {colors} from '../assets/themes/colors';

/*ds syntax allows us to b able to forward ref from parent to child component*/
export const AppImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <AppIcon name="camera" size={30} color={colors.grey} />,
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then((image) => {
            // console.log('Image picker selected image = ', image);
            onFileSelected(image);
          })
          .catch((error) => {
            console.log('Image picker error = ', error);
          });
      },
    },
    {
      name: 'Choose from gallery',
      icon: <AppIcon name="image" size={30} color={colors.grey} />,
      onPress: () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then((image) => {
            // console.log('Image picker selected image = ', image);
            onFileSelected(image);
          })
          .catch((error) => {
            console.log('Image picker error = ', error);
          });
      },
    },
  ];
  return (
    <View>
      <RBSheet
        ref={ref}
        height={200}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}>
        {options.map(({name, icon, onPress}) => (
          <TouchableOpacity key={name} style={styles.layout} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {icon}
              <Text style={styles.text}>{name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </RBSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  text: {
    fontSize: 17,
    marginLeft: 10,
  },
});

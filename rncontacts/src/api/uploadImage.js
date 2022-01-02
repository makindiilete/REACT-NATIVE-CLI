import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

/*
file => method param
onSuccess => a success callback fn
onError => an error callback fn
*/
export const uploadToServer = async (file) => {
  console.log('This file was sent to server = ', file);
  /*d path on firebase to store d image. Here 'user' will soon change to b dynamic and '777' will soon change to d user phone number*/
  // file.creationDate is added to make the image path unique
  // const path = 'contact-pictures/user/777/' + file + new Date.now();
  const path = `contact-pictures/user/777/${Date.now()}`;
  console.log('Path to be used = ', path);
  const ref = storage()?.ref(path);

  try {
    await ref?.putFile(file);
    return await ref?.getDownloadURL();
  } catch (error) {
    Alert.alert('Oops', 'Something went wrong!');
    return error;
  }
};

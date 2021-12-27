import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

const key = 'authToken';
const prefix = 'cache';
const expireInMinutes = 60;

// ds function will store our data
export const storeToStorage = async (key, value) => {
  try {
    const item = {
      value: value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    // log(err)
  }
};

export const isExpired = (item) => {
  const now = moment(Date.now()); // d current datetime
  const storedTime = moment(item.timestamp); // d value of the timestamp of the item
  // calculating the different between the two dateTime : -  if the storedTime in minutes is greater than 5mins then the item has expired
  return now.diff(storedTime, 'minutes') > expireInMinutes;
};

export const removeFromStorage = async (key) => {
  await AsyncStorage.removeItem(prefix + key);
};

// ds function will retrieve our data
export const getFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    // if the item does not exist
    if (!item) {
      return null;
    } else {
      return item.value;
    }
  } catch (err) {
    // log(err)
  }
};

// to retrieve the token from storage
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(prefix + key);
  } catch (error) {}
};

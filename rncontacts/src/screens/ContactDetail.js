import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AppIcon from '../components/AppIcon';
import {AppContainer} from '../components/AppContainer';
import {AppDivider} from '../navigations/AppDivider';
import {colors} from '../assets/themes/colors';
import {AppButton} from '../components/AppButton';
import routes from '../constants/routes';
import {AppImage} from '../navigations/AppImage';
import {DEFAULT_IMAGE_URI} from '../constants/general';
import {deleteContactService, updateContactService} from '../api/auth';

export const ContactDetail = ({route}) => {
  const {
    contact_picture,
    country_code,
    first_name,
    id,
    is_favorite,
    last_name,
    phone_number,
  } = route.params;
  const {setOptions, toggleDrawer, navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const updateFav = async () => {
    setIsLoading(true);
    await updateContactService(id, {
      ...route.params,
      is_favorite: !is_favorite,
    });
    setIsLoading(false);
    navigate(routes.CONTACT);
  };

  const deleteContact = async () => {
    setIsLoading(true);
    await deleteContactService(id);
    setIsLoading(false);
    navigate(routes.CONTACT);
  };

  useEffect(() => {
    setOptions({
      headerTitle: () => (
        <Text
          style={styles.navTitle}
          numberOfLines={1}>{`${first_name} ${last_name}`}</Text>
      ),
      headerRight: () => (
        <View style={styles.navItems}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Confirm',
                is_favorite ? 'Remove from favorite?' : 'Add to favorite?',
                [
                  {
                    text: 'Cancel',
                    style: 'destructive',
                  },
                  {
                    text: is_favorite ? 'Remove' : 'Add',
                    onPress: () => {
                      updateFav();
                    },
                  },
                ],
              );
            }}>
            <AppIcon
              type="AntDesign"
              name={is_favorite ? 'star' : 'staro'}
              size={20}
              style={{padding: 10}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert('Confirm', `Delete ${last_name} ${first_name}?`, [
                {
                  text: 'Cancel',
                  style: 'destructive',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    deleteContact();
                  },
                },
              ]);
            }}>
            <AppIcon
              type="Entypo"
              name="trash"
              size={20}
              style={{padding: 10}}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  function sendSms() {
    const operator = Platform.select({ios: '&', android: '?'});
    // Linking.openURL(`sms:${operator}body=${options.title}`);
    Linking.openURL(`sms:+${country_code}${phone_number}`);
  }

  function sendWhatsapp() {
    let url =
      'whatsapp://send?text=' + ' ' + '&phone=+' + country_code + phone_number;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        Alert.alert('Oops!', 'Make sure WhatsApp installed on your device'); //<---Error
      });
  }

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <AppImage uri={contact_picture || DEFAULT_IMAGE_URI} />
          <AppContainer>
            <ScrollView>
              <Text
                style={styles.title}
                numberOfLines={1}>{`${first_name} ${last_name}`}</Text>
              <AppDivider />
              <View style={styles.icons}>
                <TouchableOpacity
                  style={styles.icon__content}
                  onPress={() =>
                    Linking.openURL(`tel:+${country_code}${phone_number}`)
                  }>
                  <AppIcon
                    type="FontAwesome"
                    name="phone"
                    size={25}
                    style={{paddingBottom: 10}}
                    color={colors.primary}
                  />
                  <Text style={[styles.text, styles.text__primary]}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon__content}
                  onPress={sendSms}>
                  <AppIcon
                    type="MaterialIcons"
                    name="textsms"
                    size={25}
                    style={{paddingBottom: 10}}
                    color={colors.primary}
                  />
                  <Text style={[styles.text, styles.text__primary]}>Text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon__content}>
                  <AppIcon
                    type="FontAwesome5"
                    name="video"
                    size={25}
                    style={{paddingBottom: 10}}
                    color={colors.primary}
                  />
                  <Text style={[styles.text, styles.text__primary]}>Video</Text>
                </TouchableOpacity>
              </View>
              <AppDivider />
              <View style={styles.mobileSection}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() =>
                    Linking.openURL(`tel:+${country_code}${phone_number}`)
                  }>
                  <AppIcon
                    type="FontAwesome"
                    name="phone"
                    size={25}
                    style={{paddingBottom: 10, opacity: 0.6, marginRight: 20}}
                  />
                  <View>
                    <Text style={styles.text}>{phone_number}</Text>
                    <Text style={styles.text}>Mobile</Text>
                  </View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity>
                    <AppIcon
                      type="FontAwesome5"
                      name="video"
                      size={25}
                      style={{paddingBottom: 10, marginRight: 20}}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={sendSms}>
                    <AppIcon
                      type="MaterialIcons"
                      name="textsms"
                      size={25}
                      style={{paddingBottom: 10}}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <AppDivider />
              <TouchableOpacity style={styles.skype} onPress={sendWhatsapp}>
                <AppIcon
                  type="FontAwesome5Brands"
                  name="whatsapp"
                  size={25}
                  style={{marginRight: 20}}
                  color="green"
                />
                <Text
                  style={
                    styles.text
                  }>{`Whatsapp +${country_code}${phone_number}`}</Text>
              </TouchableOpacity>
              <AppDivider />
              <AppButton
                primary
                title="EDIT CONTACT"
                style={styles.button}
                onPress={() => navigate(routes.CREATE_CONTACT, route.params)}
              />
            </ScrollView>
          </AppContainer>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navItems: {
    flexDirection: 'row',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 21,
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
  },
  icon__content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
  text__primary: {
    color: colors.primary,
  },
  mobileSection: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skype: {
    flexDirection: 'row',
    paddingVertical: 30,
  },
  button: {
    width: 200,
    marginTop: 40,
    alignSelf: 'flex-end',
  },
});

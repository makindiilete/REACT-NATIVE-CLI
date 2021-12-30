import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppContainer} from '../components/AppContainer';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIcon from '../components/AppIcon';
import AppModal from '../components/AppModal';
import {AppButton} from '../components/AppButton';
import {colors} from '../assets/themes/colors';
import AppMsgComponent from '../components/AppMsgComponent';
import {getContactsService} from '../api/contacts';
import {getToken} from '../config/storage';
import routes from '../constants/routes';

export const Contacts = () => {
  //toggleDrawer() toggles d drawer
  const {setOptions, toggleDrawer, navigate} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [tokenAvailable, setTokenAvailable] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    await getToken();
    const response = await getContactsService();
    if (response.ok) {
      response?.data.sort(function (first, second) {
        if (first.first_name < second.first_name) return -1;
        if (first.first_name > second.first_name) return 1;
        return 0;
      });
      setContacts(response?.data);
    } else {
      Alert.alert('Oops', response?.data?.detail || 'Something went wrong');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <AppIcon
            type="MaterialIcons"
            name="menu"
            size={30}
            style={{padding: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderItem = ({item}) => {
    const {
      contact_picture,
      country_code,
      first_name,
      id,
      is_favorite,
      last_name,
      phone_number,
    } = item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {contact_picture ? (
              <Image
                source={{uri: contact_picture}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: colors.grey,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {`${first_name[0]} ${last_name[0]}`}
                </Text>
              </View>
            )}
          </View>
          <View style={{paddingLeft: 10}}>
            <Text numberOfLines={1} style={{fontSize: 17}}>
              {`${first_name} ${last_name}`}{' '}
            </Text>
            <Text style={{fontSize: 14, opacity: 0.7}}>
              {`${country_code} ${phone_number}`}{' '}
            </Text>
          </View>
        </View>
        <AppIcon type="AntDesign" name="right" size={18} color={colors.grey} />
      </TouchableOpacity>
    );
  };
  return (
    <AppContainer>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        modalTitle="My Profile!"
        modalBody="Hello from the modal"
        modalFooter={<></>}
      />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        onRefresh={() => fetchContacts()}
        ListEmptyComponent={
          !isLoading &&
          contacts?.length === 0 && (
            <AppMsgComponent secondary message="No contacts to show" />
          )
        }
        ListFooterComponent={<View style={{height: 50}} />}
        style={{minHeight: '100%'}}
      />

      <TouchableOpacity
        style={styles.floatingActionBtn}
        onPress={() => navigate(routes.CREATE_CONTACT)}>
        <AppIcon
          name="plus"
          color={colors.white}
          size={21}
          type="FontAwesome5"
        />
      </TouchableOpacity>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  floatingActionBtn: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 45,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

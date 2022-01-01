import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppMsgComponent from '../components/AppMsgComponent';
import {AppContainer} from '../components/AppContainer';
import {colors} from '../assets/themes/colors';
import AppIcon from '../components/AppIcon';
import {getFromStorage, storeToStorage} from '../config/storage';
import AppModal from '../components/AppModal';

export const Settings = () => {
  const [email, setEmail] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [defaultSort, setDefaultSort] = useState('lastname');

  const settingsOptions = [
    {title: 'My Info', subtitle: 'Setup your profile'},
    {title: 'Accounts', subtitle: null},
    {
      title: 'Default account for new contacts',
      subtitle: email,
      onPress: () => {},
    },
    {title: 'Contacts to display', subtitle: 'All contacts'},
    {
      title: 'Sort by',
      subtitle: defaultSort === 'lastname' ? 'Last Name' : 'First Name',
      onPress: () => setShowSortModal(true),
    },
    {title: 'Name format', subtitle: 'Last Name first'},
    {title: 'Import', subtitle: null, onPress: () => {}},
    {title: 'Export', subtitle: null, onPress: () => {}},
    {title: 'Blocked numbers', subtitle: null},
    {title: 'About Contacts', subtitle: null},
  ];

  const getSettings = async () => {
    const user = await getFromStorage('user');
    const sort = await getFromStorage('defaultSort');
    setDefaultSort(sort);
    setEmail(user?.email);
  };

  useEffect(() => {
    getSettings();
  }, []);

  const renderItem = ({item}) => {
    const {title, subtitle, onPress} = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPress && onPress}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </TouchableOpacity>
    );
  };

  const sortByContent = () => {
    return (
      <View style={{flexDirection: 'column', paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={async () => {
            setDefaultSort('lastname');
            await storeToStorage('defaultSort', 'lastname');
            setShowSortModal(false);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AppIcon
            type="AntDesign"
            name="check"
            size={14}
            color={defaultSort === 'lastname' ? 'black' : 'white'}
          />
          <Text style={{paddingVertical: 10, fontSize: 16, paddingLeft: 10}}>
            Last Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setDefaultSort('firstname');
            await storeToStorage('defaultSort', 'firstname');
            setShowSortModal(false);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AppIcon
            type="AntDesign"
            name="check"
            size={14}
            color={defaultSort === 'lastname' ? 'white' : 'black'}
          />
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 16,
              paddingLeft: 10,
            }}>
            First Name
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppModal
        modalTitle="Sort By"
        modalFooter={<></>}
        modalVisible={showSortModal}
        setModalVisible={() => setShowSortModal(!showSortModal)}
        modalBody={sortByContent()}
        closeOnTouchOutside={false}
      />
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.title)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 50}} />}
        style={{minHeight: '100%'}}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    marginVertical: 10,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  title: {
    fontSize: 17,
    marginBottom: 10,
  },
  subtitle: {
    opacity: 0.6,
  },
});

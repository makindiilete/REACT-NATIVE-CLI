import React, {useEffect} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContainer} from './AppContainer';
import {colors} from '../assets/themes/colors';
import AppIcon from './AppIcon';

const AppModal = ({
  modalVisible,
  modalTitle = 'Title',
  modalBody,
  modalFooter,
  setModalVisible,
  closeOnTouchOutside = true,
}) => {
  return (
    <>
      <Modal onDismiss={setModalVisible} visible={modalVisible} transparent>
        <Pressable
          onPress={() => {
            if (closeOnTouchOutside) {
              setModalVisible();
            }
          }}
          style={styles.container}>
          <View style={styles.modalArea}>
            <ScrollView>
              <View style={styles.header}>
                <Pressable onPress={setModalVisible}>
                  <AppIcon
                    type="AntDesign"
                    name="close"
                    size={15}
                    style={{marginRight: 20}}
                  />
                </Pressable>
                <Text style={styles.header__content}>{modalTitle}</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.body__content}>{modalBody}</Text>
              </View>
              {modalFooter ? (
                modalFooter
              ) : (
                <View style={styles.footer}>
                  <Text style={styles.footer__content}>Privacy Policy</Text>
                  <Text style={styles.footer__content}>-</Text>
                  <Text style={styles.footer__content}>Terms of Service</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalArea: {
    backgroundColor: colors.white,
    minHeight: 300,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    paddingBottom: 10,
  },
  body: {
    minHeight: 250,
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#c4c4c4',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header__content: {fontSize: 21},
  body__content: undefined,
  footer__content: undefined,
});

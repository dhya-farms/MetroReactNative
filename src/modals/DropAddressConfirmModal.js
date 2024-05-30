import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';

const DropAddessConfimModal = ({ modalVisible, setModalVisible, sameAddressPress, dropNoPress}) => {

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Drop</Text>
        <Text style={[styles.modalText, {fontSize: 16, marginTop: 20}]}>
         Would you like our executive to arrange transportation for you
        </Text>
        <Text style={styles.modalText}>
        Should the drop-off location be the same as the pickup address
        </Text>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={sameAddressPress}
        >
          <Text style={styles.modalButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.modalButtonNo]}
          onPress={dropNoPress}
        >
          <Text style={[styles.modalButtonText, styles.modalButtonNoText]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  // ... other styles ...

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative' ,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontFamily: 'Poppins',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 18,
  },
  modalText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 58,
    elevation: 2,
    backgroundColor: "#1D9BF0",
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalButtonNo: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#1D9BF0",
  },
  modalButtonText: {
    color: "white",
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center"
  },
  modalButtonNoText:{
    color: 'black'
  },
});

export default DropAddessConfimModal;
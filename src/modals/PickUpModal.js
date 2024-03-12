import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const PickupModal = ({ modalVisible, setModalVisible, onYesPress , onNoPress}) => {

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Pick up</Text>
        <Text style={styles.modalText}>
          Would you like our executive to arrange transportation for your visit?
        </Text>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={onYesPress}
        >
          <Text style={styles.modalButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.modalButtonNo]}
          onPress={onNoPress}
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
    marginTop: 22
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
    elevation: 5
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
    textAlign: "left",
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

export default PickupModal;

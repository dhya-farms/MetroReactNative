import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LogOutModal = ({ modalVisible, setModalVisible, onYesPress , onNoPress,
    title, // New prop for dynamic title
    iconName // New prop for the icon (assuming you're using an image or icon component)
  }) => {

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {iconName && <Image source={iconName} style={styles.iconStyle} />}
        <Text style={styles.modalTitle}>{title}</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={onNoPress}
        >
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.modalButtonNo]}
          onPress={onYesPress}
        >
          <Text style={[styles.modalButtonText, styles.modalButtonNoText]}>Yes</Text>
        </TouchableOpacity>
        </View>
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
    fontWeight: '500',
    fontSize: 12,
  },
  buttonContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    textAlign: "left",
    marginBottom: 20,
  },
  modalButton: {
    width: 87,
    borderRadius: 5,
    paddingVertical: 14,
    elevation: 2,
    backgroundColor: "#1D9BF0",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D9BF0',
    marginHorizontal: 10,
  },
  modalButtonNo: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#FF7676",
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
  iconStyle: {
    width: 32,
    height: 32,
    marginBottom: 10,
  },
});

export default LogOutModal;
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LogOutConfirmModal = ({ modalVisible, setModalVisible, text }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={()=>setModalVisible(false)}>
            <Icon name="check" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
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
  modalText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18, // Adjust as needed
    marginBottom:20,
  },
  confirmButton: {
    backgroundColor: "#2196F3",
    borderRadius: 30, // Half of the width/height to make it a circle
    width: 60, // Diameter of the circle
    height: 60, // Diameter of the circle
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  // Add other styles you might need
});

export default LogOutConfirmModal;
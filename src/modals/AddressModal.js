import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' } }}
        {...props}
      />
    );
  };

const AddressModal = ({ modalVisible, setModalVisible,  onDone}) => {
  // State for input fields
  const [pickupAddress, setPickupAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddressPress = () => {
    // Reset error message at each attempt
    setErrorMessage('');

    // Validate inputs
    if (!pickupAddress) {
      setErrorMessage('Please fill the address.'); // Update error message state
      return;
    }

    // If validation passes, proceed to call the onDone callback
    onDone({
      pickupAddress,
    });

    // Close the modal
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Drop</Text>
        <Text style={styles.locationText}>The drop-off location</Text>
          <FloatingLabelInput
            label="Address"
            value={pickupAddress}
            onChangeText={setPickupAddress}
          />
           {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text> // Display the error message
          )}
          <TouchableOpacity style={styles.doneButton} onPress={handleAddressPress}>
            <Text style={styles.doneButtonText}>Done</Text>
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
    marginTop: 22
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 20,
    marginTop: 20, // Add a bottom margin
  },

  doneButton: {
    backgroundColor: "#1D9BF0",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 28,
    elevation: 2,
    marginTop: 10,
  },
  doneButtonText: {
    color: "white",
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  locationText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  errorText: {
    color: 'red', // Example style for error message
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  // ... Add other styles you might need
});

export default AddressModal
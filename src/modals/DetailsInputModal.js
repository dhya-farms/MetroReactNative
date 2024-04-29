import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { CustomDatePickerInput } from '../components/CustomDatepickerInput';
import { CustomTimePickerInput } from '../components/CustomTimePickerInput';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' , onSurface: 'black'} }}
        {...props}
      />
    );
  };

const DetailsInputModal = ({ modalVisible, setModalVisible, onDone, propertyName }) => {
  // State for input fields
  const [pickupAddress, setPickupAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [property, setProperty] = useState(`${propertyName}`);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDonePress = () => {
    // Reset error message at each attempt
    setErrorMessage('');

    // Validate inputs
    if (!pickupAddress || !date || !time || !property) {
        setErrorMessage('Please fill all the details.'); // Update error message state
        return;
    }

    // Extracting hours and minutes from time state
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Setting hours, minutes, and seconds to the date state
    date.setHours(hours, minutes, seconds, 0);

    // Convert local time to UTC and remove milliseconds
    const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const pickupDateTimeIso = utcDate.toISOString().replace(/\.\d{3}/, '');

    // If validation passes, proceed to call the onDone callback
    onDone({
        pickupAddress,
        date: pickupDateTimeIso,  // Sending datetime as an ISO string without milliseconds
        property,
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
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Pick up</Text>
          <FloatingLabelInput
            label="Pickup Address"
            value={pickupAddress}
            onChangeText={setPickupAddress}
          />
          <CustomDatePickerInput
              label="Date"
              date={date}
              setDate={setDate}
          />
          <CustomTimePickerInput
                label="Time"
                time={time}
                setTime={setTime}
          />
          <FloatingLabelInput
            label="Property"
            value={property}
            onChangeText={setProperty}
            editable={false}
          />
          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text> // Display the error message
          )}
          <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
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
    position: 'relative' 
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
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 20, // Add a bottom margin
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
  errorText: {
    color: 'red', // Example style for error message
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  // ... Add other styles you might need
});

export default DetailsInputModal
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
        outlineColor="#424242" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' } }}
        {...props}
      />
    );
  };

const ContactForm = ({onContinuePress}) => {
  // State for input fields
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [aop, setAop] = useState('');
  const [occupation, setOccupation]= useState('')
  const [budget, setBudget] = useState('');
  const [type, setType] = useState('')
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!name || !mobileNumber || !email || !address || !aop || !occupation || !budget || !type) {
        setError(true); // Set error to true if any field is empty
    } else {
        setError(false); // Reset error state
        const customerDetails = {
            name, 
            mobileNumber, 
            email, 
            address, 
            aop, 
            occupation, 
            budget, 
            type
        };
        onContinuePress(customerDetails); // Proceed with filled data
    }
};


  return (
      <View style={styles.container}>
          <FloatingLabelInput
            label="Name"
            value={name}
            onChangeText={setName}
          />
          <FloatingLabelInput
            label="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="numeric"
          />
          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <FloatingLabelInput
            label="Address"
            value={address}
            onChangeText={setAddress}
          />
          <FloatingLabelInput
            label="Area Of Purpose"
            value={aop}
            onChangeText={setAop}
          />
          <FloatingLabelInput
            label="Occupation"
            value={occupation}
            onChangeText={setOccupation}
          />
          <FloatingLabelInput
            label="Budget"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <FloatingLabelInput
            label="Type"
            value={type}
            onChangeText={setType}
          />
        {error && (
        <Text style={{ color: 'red', textAlign: 'center', paddingBottom: 10 }}>
          Please fill all the details before continuing.
        </Text>
        )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
                <Text style={styles.doneButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>

  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22
  },
  input: {
    width: '80%',
    height: 40, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 20,
    color: 'black' // Add a bottom margin
  },

  buttonContainer: {
        flexDirection: 'row', // Align children in a row
        justifyContent: 'flex-end', // Align button to the end
        width: '80%', // Ensure the container takes full width
    },

  doneButton: {
    backgroundColor: "#1D9BF0",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 28,
    elevation: 2,
  },
  doneButtonText: {
    color: "white",
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  // ... Add other styles you might need
});

export default ContactForm
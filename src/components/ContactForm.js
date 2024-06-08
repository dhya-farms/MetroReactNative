import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomDropdownInput from './CustomInput';

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface:'black' } }}
        {...props}
      />
    );
  };
const isValidEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isValidMobile = mobile => {
    const re = /^[0-9]{10}$/; // Adjust pattern to fit your needs
    return re.test(mobile);
};


const ContactForm = ({onContinuePress, typeOptions, aopOptions}) => {
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation]= useState('')
  const [aop, setAop] = useState([]);
  const [type, setType] = useState([]);
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
        setError(''); // Clear error after 2 seconds
    }, 2000);
};


const handleSubmit = () => {
  if (!name || !mobileNumber || !email || !address || !aop.length || !occupation || !budget || !type.length) {
      displayError('Please fill all the details before continuing.');
  } else if (!isValidEmail(email)) {
      displayError('Please ensure the entered email is correct.');
  } else if (!isValidMobile(mobileNumber)) {
      displayError('Please enter a valid mobile number.');
  } else {
      const customerDetails = {
          name, 
          mobileNumber, 
          email, 
          address, 
          occupation, 
          budget, 
          aop,
          type,
      };
      onContinuePress(customerDetails); // Proceed with filled data
  }
};


  return (
      <View style={[styles.container]}>
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
          <View style={[styles.customTextinputContainer]}>
          <CustomDropdownInput
              label="Type"
              selectedValues={type}
              setSelectedValues={setType}
              options={typeOptions}
            />
          </View>
          <View style={[styles.customTextinputContainer]}>
          <CustomDropdownInput
              label="Area Of Purpose"
              selectedValues={aop}
              setSelectedValues={setAop}
              options={aopOptions}
            />
        </View>
        <>
        {error && (
        <Text style={{ color: 'red', textAlign: 'center', paddingBottom: 10 }}>
          {error}
        </Text>
        )}
        </>
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
    color: 'black',
    fontFamily: 'Poppins' // Add a bottom margin
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
    marginVertical: 20,
  },
  doneButtonText: {
    color: "white",
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  customTextinputContainer:{
    width: '80%'
  }
  // ... Add other styles you might need
});

export default ContactForm
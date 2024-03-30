import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import axios from 'axios';


const OTP_GENERATE_URL = 'https://splashchemicals.in/metro/api/otp/generate/'

const MobileLoginScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [otpMessage, setOtpMessage] = useState('')


    const handleLogin = async () => {
      try {
        const phoneNumberPattern = /^[6789]\d{9}$/;
    
        // Reset messages
        setErrorMessage('');
        setOtpMessage('');
    
        // Check if phone number matches the pattern
        if (!phoneNumberPattern.test(phoneNumber)) {
          // Set error message if phone number is invalid
          setErrorMessage('Please enter a valid phone number.');
          return; // Stop the function execution
        }
    
        // If phone number is valid, proceed with API call
        const response = await axios.post(OTP_GENERATE_URL, {
          mobile_no: phoneNumber
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        setOtpMessage('Otp has been Generated');
        // Clear the error message when OTP is successfully generated
        setErrorMessage('');
        setTimeout(() => navigation.navigate('OTscreen', { phoneNumber }), 3000);
      } catch (error) {
        console.log(error);
        // Set an error message and clear the OTP message in case of API call failure
        setErrorMessage(`${error}`);
        setOtpMessage('');
      }
    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image
        source={require('../../../assets/images/metrologo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.metroText}>Hello Metro Family 👋</Text>
        <Text style={styles.metroInfo}>Welcome back you’ve been missed!</Text>
      </View>
      <Text style={styles.inputLabel}>Phone Number</Text>
      <View style={styles.inputGroupContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>+91</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          inputMode="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor="#424242"
        />
      </View>
      </View>
      {otpMessage ? <Text style={styles.otpMessage}>{otpMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <ButtonComponent onPress={handleLogin} text="Get OTP" />
      <Image
        source={require('../../../assets/images/orframe.png')}
        style={styles.orimage}
        resizeMode="contain"
      />
      <Text style={styles.signInText}>Sign In</Text>
      <View style={styles.googleContainer}>
      <Image
        source={require('../../../assets/images/googleicon.png')}
        style={styles.googleImage}
        resizeMode="contain"
      />
      <Text style={styles.gLoginText}>Login With your Google Account</Text>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={{}}>
        <Text style={styles.registerButtonText}>Don't have an account yet?<Text style={{color: '#1D9BF0'}}> Register</Text></Text>
      </TouchableOpacity>
      </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: width * 0.8,
    height: 100,
    marginTop: 50,
  },
  textContainer:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginBottom: 30,
  },
  metroText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#223955'
  },
  metroInfo:{
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#A4B6C6',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginLeft: '7%', // Adjust the value to align with the input group
    color: '#223955',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  inputGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '87%',
    marginTop: 2,
  },
  buttonContainer:{
    backgroundColor: '#1D9BF0',
    borderRadius: 5,
    paddingVertical: 12, // Padding on top and bottom inside the input
    paddingHorizontal: 10, // Add some padding to the left of the text
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Set to white or any other color you need
    borderRadius: 10,
    width: '80%', // Set the width of the input container // Add space between input fields
    paddingHorizontal: 12, // Padding on the sides of the input container
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
  },
  input: {
    flex: 1, // Take up all available space after the icon
    height: 50, // Adjust the height as needed
    fontSize: 16,
    color: '#424242', // This should be a darker color for better visibility
    backgroundColor: '#FFFFFF', // Set to white or any other color you need
    fontFamily: 'Poppins',
    fontWeight: '400',
    borderRadius: 10,
    borderWidth: 0, // No border for the actual input
    paddingVertical: 10, // Padding on top and bottom inside the input
    paddingHorizontal: 10, // Add some padding to the left of the text
  },

  orimage:{
    width: width,
    margin: 15,
  },
  googleContainer:{
    flexDirection: 'row',
    width: '90%',
    borderWidth: 2,
    borderColor: '#1D9BF0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 20,
  },
  googleImage:{
    width: 38,
    height: 38,
    marginRight: 10,
  },
  gLoginText:{
    color: '#424242',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  signInText:{
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 18,
    color: '#1D9BF0',
    textAlign: 'center',
    margin: 10,
  },
  registerButton: {
    margin: 15,
  },
  registerButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#B7B7B7',
    fontSize: 16,
  },
});

export default MobileLoginScreen;
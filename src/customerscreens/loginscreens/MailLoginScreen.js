import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonComponent from '../../components/ButtonComponent';

const MailLoginScreen = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible]= useState(false)

    const handleGetOTP = () => {
        navigation.navigate('CustomerBottomTab')
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
      <View style={styles.inputsContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="UserName"
          inputMode="Text"
          placeholderTextColor="#424242"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Password"
          inputMode="text"
          value={password}
          placeholderTextColor="#424242"
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // If isPasswordVisible is false, password will be hidden
        />
         <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <MaterialIcons
          name={isPasswordVisible ? 'visibility' : 'visibility-off'}
          size={18}
          color="#7B6F72"
        />
      </TouchableOpacity>
      </View>
      </View>
      <Text style={styles.ForgetLabel}>Forget Password?</Text>
      <ButtonComponent onPress={handleGetOTP} text="Login" />
      <Image
        source={require('../../../assets/images/orframe.png')}
        style={styles.orimage}
        resizeMode="contain"
      />
      <Text style={styles.signInText}>Using Phone Number</Text>
      <View style={styles.googleContainer}>
      <Image
        source={require('../../../assets/images/googleicon.png')}
        style={styles.googleImage}
        resizeMode="contain"
      />
      <Text style={styles.gLoginText}>Login With your Google Account</Text>
      </View>
      </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputsContainer:{
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF', // Set to white or any other color you need
      borderRadius: 10,
      width: '80%', // Set the width of the input container
      marginBottom: 8, // Add space between input fields
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
  ForgetLabel:{
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the value to align with the input group
    color: '#FF5C5C',
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
  }
});

export default MailLoginScreen;
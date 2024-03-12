import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react'
import ButtonComponent from '../../components/ButtonComponent';

const RegisterUserScreen = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible]= useState(false)


  const handleGetRegister = () => {
    // Logic to handle OTP request
    navigation.navigate("MAlogin")
  };

  return (
    <View style= {styles.container}>
      <Text style={styles.registerText}>
        Register
      </Text>
      <View style={styles.inputsContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="UserName"
          inputMode="text"
          placeholderTextColor="#424242"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          inputMode="text"
          placeholderTextColor="#424242"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Mobile Number"
          inputMode="numeric"
          placeholderTextColor="#424242"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} // If isPasswordVisible is false, password will be hidden
          placeholder="DOB"
          inputMode="numeric"
          placeholderTextColor="#424242"
        />
        <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => {}}
      >
        <MaterialIcons
          name="calendar-today"
          size={18}
          color="#7B6F72"
        />
      </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="User Id"
          inputMode="numeric"
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
      <ButtonComponent onPress={handleGetRegister} text="Login" />
      <TouchableOpacity style={styles.registerButton} onPress={{}}>
        <Text style={styles.registerButtonText}>Don't have an account yet?<Text style={{color: '#1D9BF0'}}>Click Here</Text></Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    registerText: {
      fontSize: 24,
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 25,
      padding: 5,
    },
    inputsContainer:{
      marginTop: 3,
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
    eyeIcon: {
      position: 'absolute',
      right: 10, // Position the icon inside the input box on the right
    },
    registerButton: {
      margin: 7,
    },
    registerButtonText: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: '#B7B7B7',
      fontSize: 16,
    },
  })

export default RegisterUserScreen
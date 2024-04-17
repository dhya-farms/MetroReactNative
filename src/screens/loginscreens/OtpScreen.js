import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const VERIFY_URL = 'https://splashchemicals.in/metro/api/otp/verify/'
const RESEND_URL = 'https://splashchemicals.in/metro/api/otp/resend/'

const OtpScreen = ({ route, navigation }) => {
  const [otp, setOtp]= useState(new Array(6).fill(''))
  const inputsRef = useRef(new Array(6).fill().map(() => React.createRef()));
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for 1:30
  const [isResendButtonEnabled, setIsResendButtonEnabled] = useState(false);
  const [resetSucessMessage, setResetSucessMessage] = useState('')

  const { phoneNumber } = route.params;

  useEffect(() => {
    // Exit early when we reach 0
    if (timeLeft === 0) {
      setIsResendButtonEnabled(true);
      return;
    }
  
    // Save intervalId to clear the interval when the
    // component re-renders or unmounts
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
  
    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // Add timeLeft as a dependency to re-run the effect
    // when we update it
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };



  const handleOtpChange = (text, index) => {
    otp[index] = text;
    setOtp([...otp]);
  
    // Adjust the condition to handle up to 5 indices (for a total of 6 inputs)
    if (text !== '' && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleGetLogin = () => {
    const enteredOtp = otp.join("");
    const defaultOtp = "111111";
  
    if (enteredOtp === defaultOtp) {
      switch (phoneNumber) {
        case "7695941098":
          navigation.navigate("CustomerBottomTab");
          break;
        case "8778714616":
          navigation.navigate("AdminBottomTab");
          break;
        case "9788981574":
          navigation.navigate("SoBottomTab");
          break;
        default:
          // Handle invalid phone number or OTP
          alert("Invalid phone number or OTP.");
      }
    } else {
      // Handle incorrect OTP
      alert("Incorrect OTP entered.");
    }
  };


  const handleResendOtp = async()=>{
    setTimeLeft(90); // Or whatever your starting time is
    setIsResendButtonEnabled(false);
    try {
      const response = await axios.post(RESEND_URL, {
        mobile_no: phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
        }
      });
      console.log('Verification success:', response.data);
      setResetSucessMessage('New Otp has been sent to your Phone')
      setTimeout(() => setResetSucessMessage(''), 2500);
    } catch (error) {
      console.error('Verification error:', error.response ? error.response.data : error.message); 
    }
  }
  const verifyLogin = async () => {
    const enteredOtp = otp.join('');
    console.log(`Verifying OTP: ${enteredOtp}`);
  
    try {
      const response = await axios.post(VERIFY_URL, {
        otp: enteredOtp,
        mobile_no: phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Verification success:', response.data);
  
      // Store the token and user data
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userId', response.data.customer.id.toString());
      await AsyncStorage.setItem('role', response.data.user.role.toString());
      await AsyncStorage.setItem('createdBy', response.data.customer.created_by.toString());
  
      // Determine navigation based on user role
      let navigateToTab;
      switch (response.data.user.role) {
        case 1:
          navigateToTab = {
            name: 'AdminBottomTab',
            params: {
              screen: 'Home', // Assuming 'Home' is the tab containing CustomerHomeScreenNavigator
              params: {
                screen: 'Admin home', // Assuming 'Customer Home' is the route name within CustomerHomeScreenNavigator
                params: {
                  token: response.data.token,
                  userId: response.data.customer.id.toString(),
                }
              }
            }
          };
          break;
        case 3:
          navigateToTab = {
            name: 'SoBottomTab',
            params: {
              screen: 'SO Home', // Assuming 'Home' is the tab containing CustomerHomeScreenNavigator
              params: {
                screen: 'SO home', // Assuming 'Customer Home' is the route name within CustomerHomeScreenNavigator
                params: {
                  token: response.data.token,
                  userId: response.data.customer.id.toString(),
                }
              }
            }
          };
          break;
        case 4:
          navigateToTab = {
            name: 'CustomerBottomTab',
            params: {
              screen: 'Home', // Assuming 'Home' is the tab containing CustomerHomeScreenNavigator
              params: {
                screen: 'Customer Home', // Assuming 'Customer Home' is the route name within CustomerHomeScreenNavigator
                params: {
                  token: response.data.token,
                  userId: response.data.customer.id.toString(),
                  soId: response.data.customer.created_by.toString()
                }
              }
            }
          };
          break;
        default:
          // Define a default navigation if the role doesn't match known values
          navigateToTab = {
            name: 'CustomerBottomTab',
            params: {
              screen: 'Home', // Assuming 'Home' is the tab containing CustomerHomeScreenNavigator
              params: {
                screen: 'Customer Home', // Assuming 'Customer Home' is the route name within CustomerHomeScreenNavigator
                params: {
                  token: response.data.token,
                  userId: response.data.customer.id.toString(),
                }
              }
            }
          }; // Adjust as needed
          break;
      }
  
      // Reset the navigation stack to the determined tab and screen
      navigation.reset({
        index: 0,
        routes: [navigateToTab],
      });
    } catch (otpError) {
      console.error('Verification error:', otpError.response ? otpError.response.data : otpError.message);
      console.log('Sent OTP:', enteredOtp);
      // Handle error, show message to user
    }
  };
  
  
  

  return (
    <View style= {styles.container}>
      <View style={styles.logoContainer}>
      <Image
          source={require('../../../assets/images/metrologo.png')}
          resizeMode='contain'
          style={styles.logo}
        />
      </View>
      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={el => inputsRef.current[index] = el}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad" // Ensure the keyboard is numeric
            onChangeText={(text) => handleOtpChange(text, index)}
            value={otp[index]}
          />
        ))}
      </View>
      <View style={styles.bottomContainer}>
      <TouchableOpacity onPress={handleResendOtp} disabled={!isResendButtonEnabled}>
        <Text style={styles.resendText}>{isResendButtonEnabled ? 'Resend OTP' : ''}</Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
     </View>
     {resetSucessMessage ? <Text style={styles.errorMessage}>{resetSucessMessage}</Text> : null}
     <View style={styles.changeNumContiner}>
        <Text style={styles.cnText}>{phoneNumber} Change number?</Text>
     </View>
     <ButtonComponent onPress={verifyLogin} text="Login" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 40,
  
    },
    logoContainer: {
      marginBottom: 40,
      textAlign: 'center',
    },
    logo:{
      width: 305,
      height: 134,
    },
    otpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    otpBox: {
      width: 35,
      height: 35,
      textAlign: 'center',
      marginHorizontal: 10,
      fontSize: 18,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#1D9BF0',
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
    },
    resendText: {
      color: '#ADA4A5',
      fontFamily: 'Poppins',
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
    timerText: {
      color: '#ADA4A5',
      fontFamily: 'Poppins',
      fontWeight: '500',
      textDecorationLine: 'underline'
    },
    changeNumContiner:{
      width: '80%',
      margin: 30,
    },
    cnText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
      color: '#A4B6C6',
      textAlign: 'center',
    },
    errorMessage:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: '#5cb85c',
    }
  })

export default OtpScreen
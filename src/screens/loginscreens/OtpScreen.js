import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



const VERIFY_URL = 'https://dhya.app/metro/api/otp/verify/'
const RESEND_URL = 'https://dhya.app/metro/api/otp/resend/'

const OtpScreen = ({ route, navigation }) => {
  const [otp, setOtp]= useState(new Array(6).fill(''))
  const inputsRef = useRef([...new Array(6)].map(() => React.createRef()));
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for 1:30
  const [isResendButtonEnabled, setIsResendButtonEnabled] = useState(false);
  const [resetSucessMessage, setResetSucessMessage] = useState('')

  const changeNumberPress = ()=>{
    navigation.goBack()
  }

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
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  
    // Move focus to next input if current input is not the last one and has been filled
    if (text !== '' && index < 5) {
      inputsRef.current[index + 1]?.current?.focus();
    }
  };
  

  const handleBackspace = (text, index) => {
    // Move focus to previous input if current is empty and it's not the first input
    if (text === '' && index > 0) {
      inputsRef.current[index - 1]?.current?.focus();
    }
  };

  const onKeyPress = ({ nativeEvent: { key }, index }) => {
    if (key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        handleBackspace(otp[index], index);
        const newOtp = [...otp];
        newOtp[index - 1] = ''; // Clear the previous input
        setOtp(newOtp);
      }
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

      const { user } = response.data;
      if (!user.role) {
        // Role is null or not defined, handle this case by showing an error message
        console.error("User role not defined, cannot proceed with login.");
        Toast.show({
          type: 'error',
          text1: 'Contact your Admin to Register your Number and Log in.',
          visibilityTime: 2490,
       });

        setTimeout(() => {
          navigation.goBack();
        }, 2500);
        return; 
      }
  
      // Store the token and user data
      await AsyncStorage.setItem('userToken', response.data.token);
      const userId = response.data.customer ? response.data.customer.id.toString() : response.data.user.id.toString();
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('role', user.role.toString());
      if (response.data.customer && response.data.customer.created_by) {
        await AsyncStorage.setItem('createdBy', response.data.customer.created_by.toString());
      }       
  
      // Determine navigation based on user role
      let navigateToTab;
      switch (response.data.user.role) {
        case 1:
        case 2:
          navigateToTab = {
            name: 'AdminBottomTab',
            params: {
              screen: 'Home', // Assuming 'Home' is the tab containing CustomerHomeScreenNavigator
              params: {
                screen: 'Admin home', // Assuming 'Customer Home' is the route name within CustomerHomeScreenNavigator
                params: {
                  token: response.data.token,
                  userId: response.data.customer ? response.data.customer.id.toString() : response.data.user.id.toString()
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
                  userId: response.data.customer ? response.data.customer.id.toString() : response.data.user.id.toString()
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
                  soId: response.data.customer?.created_by?.toString()
                }
              }
            }
          };
          break;
        default:
          // Define a default navigation if the role doesn't match known values
          console.error('User role is undefined or not recognized');
          Toast.show({
            type: 'error',
            text1: 'Contact your Admin to Register your Number and Log in.',
            visibilityTime: 2490,
         });
          return;
      }
  
      // Reset the navigation stack to the determined tab and screen
      navigation.reset({
        index: 0,
        routes: [navigateToTab],
      });
    } catch (otpError) {
      console.error('Verification error:', otpError.response ? otpError.response.data : otpError.message);
      console.log('Sent OTP:', enteredOtp);
      Toast.show({
        type: 'error',
        text1: 'Please Enter the Correct OTP and Try Again',
        visibilityTime: 2000,
     });
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
      {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={inputsRef.current[index]}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(event) => onKeyPress({ nativeEvent: event.nativeEvent, index })}
            value={value}
          />
        ))}
      </View>
      <View style={styles.bottomContainer}>
      <TouchableOpacity onPress={handleResendOtp} disabled={!isResendButtonEnabled}>
        <Text style={styles.resendText}>{isResendButtonEnabled ? 'Resend OTP' : ''}</Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
     </View>
     <TouchableOpacity style={styles.changeNumContiner} onPress={changeNumberPress}>
        <Text style={styles.cnText}>{phoneNumber} Change number?</Text>
     </TouchableOpacity>
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
    erContainer:{
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15,
    },
    errorMessage:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: 'red',
      fontSize: 12,
      textAlign: 'center'
    }
  })

export default OtpScreen
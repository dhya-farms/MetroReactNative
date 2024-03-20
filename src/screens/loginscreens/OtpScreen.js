import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';



const OtpScreen = ({navigation}) => {
  const [otp, setOtp]= useState(new Array(6).fill(''))
  const inputsRef = useRef(new Array(4).fill(0).map(()=>React.createRef()))
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for 1:30
  const [isResendButtonEnabled, setIsResendButtonEnabled] = useState(false);
  const [resetSucessMessage, setResetSucessMessage] = useState('')

  const handleGetLogin = () => {
    navigation.navigate('REscreen')
    
  };


  const handleOtpChange = (text, index)=>{
    otp[index]= text
    setOtp([...otp])
    if(text!=='' && index < 3){
      inputsRef.current[index+1].focus();
    }
  }

  const verifyLogin = async () => {
    const enteredOtp = otp.join('');
    console.log(`Verifying OTP: ${enteredOtp}`); // Debugging: Log the OTP being sent
  
    try {
      const response = await axios.post(VERIFY_URL, {
        otp: enteredOtp,
        mobile_no: phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
        }
      });
      console.log('Verification success:', response.data);
  
      // Store the token
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('userId', response.data.user_id.toString());

      navigation.navigate('welcomescreen', {
        screen: 'welcomescreen', // Assuming 'WeighterHome' is a part of your BottomTab navigator
        params: {
          token: response.data.token,
          userId: response.data.user_id.toString(),
        },
      });
    } catch (otpError) {
      console.error('Verification error:', otpError.response ? otpError.response.data : otpError.message); // Improved error logging
      console.log('Sent OTP:', enteredOtp); // Log the sent OTP for debugging
      // Consider showing an error message to the user here
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
    } catch (error) {
      console.error('Verification error:', error.response ? error.response.data : error.message); 
// Improved error logging // Log the sent OTP for debugging
      // Consider showing an error message to the user here
    }
  }
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
            ref={(ref) => { inputsRef.current[index] = ref; }}
            style={styles.otpBox}
            maxLength={1}
            placeholder='-'
            inputMode='numeric'
            onChangeText={(text) => handleOtpChange(text, index)}
            value={otp[index]}
          />
        ))}
      </View>
      <View style={styles.bottomContainer}>
      <TouchableOpacity onPress={()=>{}}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
      <Text style={styles.timerText}>1:30</Text>
     </View>
     <View style={styles.changeNumContiner}>
        <Text style={styles.cnText}>9455686785 Change number?</Text>
     </View>
     <ButtonComponent onPress={handleGetLogin} text="Login" />
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
    }
  })

export default OtpScreen
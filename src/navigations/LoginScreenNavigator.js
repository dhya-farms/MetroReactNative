import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobileLoginScreen from '../customerscreens/loginscreens/MobileLoginScreen';
import MailLoginScreen from '../customerscreens/loginscreens/MailLoginScreen';
import OtpScreen from '../customerscreens/loginscreens/OtpScreen';
import RegisterUserScreen from '../customerscreens/loginscreens/RegisterUserScreen';

const LoginScreen = createNativeStackNavigator();

const LoginScreenNavigator = () => {
  return (
    <LoginScreen.Navigator screenOptions={{ headerShown: false }}>
      <LoginScreen.Screen name="MBlogin" component={MobileLoginScreen} />
      <LoginScreen.Screen name='OTscreen' component={OtpScreen}/>
      <LoginScreen.Screen name="MAlogin" component={MailLoginScreen} />
      <LoginScreen.Screen name="REscreen" component={RegisterUserScreen} />
    </LoginScreen.Navigator>
  );
};

export default LoginScreenNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobileLoginScreen from '../screens/loginscreens/MobileLoginScreen';
import MailLoginScreen from '../screens/loginscreens/MailLoginScreen';
import OtpScreen from '../screens/loginscreens/OtpScreen';
import RegisterUserScreen from '../screens/loginscreens/RegisterUserScreen';

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
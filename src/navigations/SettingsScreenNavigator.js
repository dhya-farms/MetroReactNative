import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerSettings from '../customerscreens/customerhomescreens/CustomerSettings';
import CustomerSupport from '../customerscreens/customerhomescreens/CustomerSupport';
import CustomerFaq from '../customerscreens/customerhomescreens/CustomerFaq';

const SettingsScreen = createNativeStackNavigator();

const SettingsScreenNavigator = () => {
  return (
    <SettingsScreen.Navigator screenOptions={{ headerShown: false }}>
      <SettingsScreen.Screen name="Customer Settings" component={CustomerSettings} />
      <SettingsScreen.Screen name="Customer Support" component={CustomerSupport} />
      <SettingsScreen.Screen name="Customer Faq" component={CustomerFaq}/>
    </SettingsScreen.Navigator>
  );
};

export default SettingsScreenNavigator;
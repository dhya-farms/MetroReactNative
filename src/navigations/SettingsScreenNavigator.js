import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerSettings from '../screens/customerhomescreens/CustomerSettings';
import CustomerSupport from '../screens/customerhomescreens/CustomerSupport';
import CustomerFaq from '../screens/customerhomescreens/CustomerFaq';
import CustomerPolicies from '../screens/customerhomescreens/CustomerPolicies';

const SettingsScreen = createNativeStackNavigator();

const SettingsScreenNavigator = ({navigation}) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      // Navigate to the first screen of the stack
      navigation.navigate('Settings', {
        screen: 'Customer Settings',
      });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SettingsScreen.Navigator screenOptions={{ headerShown: false }}>
      <SettingsScreen.Screen name="Customer Settings" component={CustomerSettings} />
      <SettingsScreen.Screen name="Customer Support" component={CustomerSupport} />
      <SettingsScreen.Screen name="Customer Faq" component={CustomerFaq}/>
      <SettingsScreen.Screen name="Customer Policy" component={CustomerPolicies}/>
    </SettingsScreen.Navigator>
  );
};

export default SettingsScreenNavigator;
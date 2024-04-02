import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHome from '../customerscreens/customerhomescreens/CustomerHome';

const CustomerHomeScreen = createNativeStackNavigator();

const CustomerHomeScreenNavigator = () => {
  return (
    <CustomerHomeScreen.Navigator screenOptions={{ headerShown: false }}>
      <CustomerHomeScreen.Screen name="Customer Home" component={CustomerHome} />
    </CustomerHomeScreen.Navigator>
  );
};

export default CustomerHomeScreenNavigator;
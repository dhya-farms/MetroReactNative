import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHome from '../screens/customerhomescreens/CustomerHome';

const CustomerHomeScreen = createNativeStackNavigator();

const CustomerHomeScreenNavigator = ({route}) => {
  const { token, userId } = route.params;
  return (
    <CustomerHomeScreen.Navigator screenOptions={{ headerShown: false }}>
      <CustomerHomeScreen.Screen name="Customer Home" component={CustomerHome} 
      initialParams={{ token, userId }}/>
    </CustomerHomeScreen.Navigator>
  );
};

export default CustomerHomeScreenNavigator;
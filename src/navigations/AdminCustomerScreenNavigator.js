import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminCustomerList from '../screens/adminscreens/AdminCustomersList';
import AdminCustomerDetails from '../screens/adminscreens/AdminCustomerDetails';

const AdminCustomerScreen = createNativeStackNavigator();

const AdminCustomerScreenNavigator = () => {
  return (
    <AdminCustomerScreen.Navigator screenOptions={{ headerShown: false }}>
      <AdminCustomerScreen.Screen name="Customer List" component={AdminCustomerList} />
      <AdminCustomerScreen.Screen name="List Customer Details" component={AdminCustomerDetails} />
    </AdminCustomerScreen.Navigator>
  );
};

export default AdminCustomerScreenNavigator;
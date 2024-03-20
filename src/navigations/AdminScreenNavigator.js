import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminProperties from '../screens/adminscreens/AdminProperties';
import AdminPropertiesDetails from '../screens/adminscreens/AdminPropertiesDetails';

const AdminProperty = createNativeStackNavigator();

const AdminPropertyNavigator = () => {
  return (
    <AdminProperty.Navigator screenOptions={{ headerShown: false }}>
      <AdminProperty.Screen name="Admin Properties" component={AdminProperties} />
      <AdminProperty.Screen name="Admin Properties Details" component={AdminPropertiesDetails} />
    </AdminProperty.Navigator>
  );
};

export default AdminPropertyNavigator;
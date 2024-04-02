import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from '../screens/adminscreens/AdminHome';
import AdminOfficeUpdates from '../screens/adminscreens/AdminOfficeUpdates';


const AdminHomeScreen = createNativeStackNavigator();

const AdminHomeScreenNavigator = () => {
  return (
    <AdminHomeScreen.Navigator screenOptions={{ headerShown: false }}>
      <AdminHomeScreen.Screen name="Admin home" component={AdminHome} />
      <AdminHomeScreen.Screen name="Admin Office Updates" component={AdminOfficeUpdates} />
    </AdminHomeScreen.Navigator>
  );
};

export default AdminHomeScreenNavigator;
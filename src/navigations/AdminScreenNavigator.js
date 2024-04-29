import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminProperties from '../screens/adminscreens/AdminProperties';
import AdminPropertiesDetails from '../screens/adminscreens/AdminPropertiesDetails';
import { AdminPropertiesProvider } from '../contexts/useAdminProperties';

const AdminProperty = createNativeStackNavigator();



const AdminPropertyNavigator = ({navigation}) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      // Navigate to the first screen of the stack
      navigation.navigate('Sites', {
        screen: 'Admin Properties',
      });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <AdminPropertiesProvider>
    <AdminProperty.Navigator screenOptions={{ headerShown: false }}>
      <AdminProperty.Screen name="Admin Properties" component={AdminProperties} />
      <AdminProperty.Screen name="Admin Properties Details" component={AdminPropertiesDetails} />
    </AdminProperty.Navigator>
    </AdminPropertiesProvider>
  );
};

export default AdminPropertyNavigator;
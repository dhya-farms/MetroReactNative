import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerProperties from '../screens/customerhomescreens/CustomerProperties';
import ShowProperties from '../screens/customerhomescreens/ShowProperties';
import MyPropertiesDetails from '../screens/customerhomescreens/MyPropertiesDetails';
import { PropertiesProvider } from '../contexts/usePropertiesContext';
import { RefreshProvider } from '../contexts/useRefreshContext';

const PropertyScreen = createNativeStackNavigator();



const PropertyScreenNavigator = ({navigation}) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      // Navigate to the first screen of the stack
      navigation.navigate('properties', {
        screen: 'Customer Properties',
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <RefreshProvider>
    <PropertiesProvider>
      <PropertyScreen.Navigator screenOptions={{ headerShown: false }}>
        <PropertyScreen.Screen name="Customer Properties" component={CustomerProperties}/>
        <PropertyScreen.Screen name="Show Properties" component={ShowProperties} />
        <PropertyScreen.Screen name="Property Details" component={MyPropertiesDetails}/>
      </PropertyScreen.Navigator>
    </PropertiesProvider>
    </RefreshProvider>
  );
};

export default PropertyScreenNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerProperties from '../customerscreens/customerhomescreens/CustomerProperties';
import ShowProperties from '../customerscreens/customerhomescreens/ShowProperties';
import MyPropertiesDetails from '../customerscreens/customerhomescreens/MyPropertiesDetails';

const PropertyScreen = createNativeStackNavigator();

const PropertyScreenNavigator = () => {
  return (
    <PropertyScreen.Navigator screenOptions={{ headerShown: false }}>
      <PropertyScreen.Screen name="Customer Properties" component={CustomerProperties} />
      <PropertyScreen.Screen name="Show Properties" component={ShowProperties} />
      <PropertyScreen.Screen name="Property Details" component={MyPropertiesDetails}/>
    </PropertyScreen.Navigator>
  );
};

export default PropertyScreenNavigator;
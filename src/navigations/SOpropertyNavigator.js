import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SOproperties from '../screens/soscreens/SOproperties';
import SOpropertiesDetails from '../screens/soscreens/SOpropertiesDetails';
import { PropertiesProvider } from '../contexts/usePropertiesContext';


const SOproperty = createNativeStackNavigator();

const SOpropertyNavigator = () => {
  return (
    <PropertiesProvider>
    <SOproperty.Navigator  screenOptions={{ headerShown: false }}>
      <SOproperty.Screen name="SO Properties" component={SOproperties} />
      <SOproperty.Screen name="SO Properties Details" component={SOpropertiesDetails} />
    </SOproperty.Navigator>
    </PropertiesProvider>
  );
};

export default SOpropertyNavigator;
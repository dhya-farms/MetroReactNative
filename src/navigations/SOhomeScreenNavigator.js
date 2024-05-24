import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SOhome from '../screens/soscreens/SOhome';
import SOofficeUpdates from '../screens/soscreens/SOofficeUpdates';
import { RefreshProvider } from '../contexts/useRefreshContext';


const SOhomeScreen = createNativeStackNavigator();

const SOhomeScreenNavigator = () => {
  return (
    <RefreshProvider>
      <SOhomeScreen.Navigator screenOptions={{ headerShown: false }}>
        <SOhomeScreen.Screen name="SO home" component={SOhome} />
        <SOhomeScreen.Screen name="Office Updates" component={SOofficeUpdates} />
      </SOhomeScreen.Navigator>
    </RefreshProvider>
  );
};

export default SOhomeScreenNavigator;
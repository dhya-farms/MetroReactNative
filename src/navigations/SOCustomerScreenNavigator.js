import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerContactScreen from '../screens/soscreens/CustomerContactScreen';
import SoCustomerDetails from '../screens/soscreens/SoCustomerDetails';
import CustomerTokenAdvance from '../screens/soscreens/CustomerTokenAdvance';
import CustomerDocumentation from '../screens/soscreens/CustomerDocumentation';
import CustomerPaymentMethod from '../screens/soscreens/CustomerPaymentMethod';
import CustomerDocumentDelivery from '../screens/soscreens/CustomerDocumentDelivery';
import { SoCustomerProvider } from '../contexts/useSoCustomersData';
import { CustomerProvider } from '../contexts/useCustomerContext';
import { RefreshProvider } from '../contexts/useRefreshContext';

const SOCustomerScreen = createNativeStackNavigator();


const SOCustomerScreenNavigator = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      navigation.navigate('SO Client', {
        screen: 'Customer Contact Screen',
      });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <RefreshProvider>
    <CustomerProvider>
      <SoCustomerProvider>
      <SOCustomerScreen.Navigator screenOptions={{ headerShown: false }}>
        <SOCustomerScreen.Screen name="Customer Contact Screen" component={CustomerContactScreen} />
        <SOCustomerScreen.Screen name="SO Customer Details" component={SoCustomerDetails} />
        <SOCustomerScreen.Screen name="Token Advance" component={CustomerTokenAdvance} />
        <SOCustomerScreen.Screen name="Documentation" component={CustomerDocumentation} />
        <SOCustomerScreen.Screen name="Payment Method" component={CustomerPaymentMethod} />
        <SOCustomerScreen.Screen name="Document Delivery" component={CustomerDocumentDelivery} />
      </SOCustomerScreen.Navigator>
      </SoCustomerProvider>
    </CustomerProvider>
    </RefreshProvider>
  );
};

export default SOCustomerScreenNavigator;
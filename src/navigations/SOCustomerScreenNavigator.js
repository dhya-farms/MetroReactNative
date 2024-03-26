import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminCustomerList from '../screens/adminscreens/AdminCustomersList';
import AdminCustomerDetails from '../screens/adminscreens/AdminCustomerDetails';
import CustomerContactScreen from '../screens/soscreens/CustomerContactScreen';
import SoCustomerDetails from '../screens/soscreens/SoCustomerDetails';
import CustomerTokenAdvance from '../screens/soscreens/CustomerTokenAdvance';
import CustomerDocumentation from '../screens/soscreens/CustomerDocumentation';
import CustomerPaymentMethod from '../screens/soscreens/CustomerPaymentMethod';
import CustomerDocumentDelivery from '../screens/soscreens/CustomerDocumentDelivery';

const SOCustomerScreen = createNativeStackNavigator();

const SOCustomerScreenNavigator = () => {
  return (
    <SOCustomerScreen.Navigator screenOptions={{ headerShown: false }}>
      <SOCustomerScreen.Screen name="Customer Contact Screen" component={CustomerContactScreen} />
      <SOCustomerScreen.Screen name="SO Customer Details" component={SoCustomerDetails} />
      <SOCustomerScreen.Screen name="Token Advance" component={CustomerTokenAdvance} />
      <SOCustomerScreen.Screen name="Documentation" component={CustomerDocumentation} />
      <SOCustomerScreen.Screen name="Payment Method" component={CustomerPaymentMethod} />
      <SOCustomerScreen.Screen name="Document Delivery" component={CustomerDocumentDelivery} />
    </SOCustomerScreen.Navigator>
  );
};

export default SOCustomerScreenNavigator;
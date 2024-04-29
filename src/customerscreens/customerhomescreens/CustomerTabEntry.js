import React from 'react';
import { CustomerProvider } from '../../contexts/useCustomerdata';
import { CustomerPropertiesProvider } from '../../contexts/useCustomerPropertiesApi';
import CustomerBottomTab from './CustomerBottomTab';
import Toast from 'react-native-toast-message';

const CustomerTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
    <CustomerProvider>
      <CustomerPropertiesProvider paramsToken={cusToken} paramsUserId={cusUserId}>
          <CustomerBottomTab />
          <Toast />
      </CustomerPropertiesProvider>
    </CustomerProvider>
  );
};

export default CustomerTabEntry;
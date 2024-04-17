import React from 'react';
import { CustomerProvider } from '../../contexts/useCustomerdata';
import { CustomerPropertiesProvider } from '../../contexts/useCustomerPropertiesApi';
import { PropertiesProvider } from '../../contexts/usePropertiesContext';
import CustomerBottomTab from './CustomerBottomTab';

const CustomerTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
    <CustomerProvider>
      <CustomerPropertiesProvider paramsToken={cusToken} paramsUserId={cusUserId}>
        <PropertiesProvider>
          <CustomerBottomTab />
        </PropertiesProvider>
      </CustomerPropertiesProvider>
    </CustomerProvider>
  );
};

export default CustomerTabEntry;
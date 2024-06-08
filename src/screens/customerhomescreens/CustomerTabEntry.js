import React from 'react';
import { CustomerProvider } from '../../contexts/useCustomerdata';
import { CustomerPropertiesProvider } from '../../contexts/useCustomerPropertiesApi';
import CustomerBottomTab from './CustomerBottomTab';

const CustomerTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
    <CustomerProvider>
      <CustomerPropertiesProvider paramsToken={cusToken} paramsUserId={cusUserId}>
          <CustomerBottomTab  route={route}/>
      </CustomerPropertiesProvider>
    </CustomerProvider>
  );
};

export default CustomerTabEntry;
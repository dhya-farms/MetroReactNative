import React from 'react';
import { CustomerProvider } from '../../contexts/useCustomerdata';
import { CustomerPropertiesProvider } from '../../contexts/useCustomerPropertiesApi';
import { PropertiesProvider } from '../../contexts/usePropertiesContext';
import SObottomTab from './SObottomTab';


const SoTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
    <CustomerProvider>
      <CustomerPropertiesProvider paramsToken={cusToken} paramsUserId={cusUserId}>
        <PropertiesProvider>
          <SObottomTab />
        </PropertiesProvider>
      </CustomerPropertiesProvider>
    </CustomerProvider>
  );
};

export default SoTabEntry;
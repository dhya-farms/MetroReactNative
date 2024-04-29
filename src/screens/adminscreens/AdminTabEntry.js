import React from 'react';
import { CustomerProvider } from '../../contexts/useCustomerdata';
import { CustomerPropertiesProvider } from '../../contexts/useCustomerPropertiesApi';
import AdminBottomTab from './AdminBottomTab';

const AdminTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
    <CustomerProvider>
      <CustomerPropertiesProvider paramsToken={cusToken} paramsUserId={cusUserId}>
          <AdminBottomTab />
      </CustomerPropertiesProvider>
    </CustomerProvider>
  );
};

export default AdminTabEntry;
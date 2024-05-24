import React from 'react';
import { CustomerProvider } from '../../contexts/useCustomerdata';
import { CustomerPropertiesProvider } from '../../contexts/useCustomerPropertiesApi';
import AdminBottomTab from './AdminBottomTab';
import { RefreshProvider } from '../../contexts/useRefreshContext';

const AdminTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
    <RefreshProvider>
    <CustomerProvider>
      <CustomerPropertiesProvider paramsToken={cusToken} paramsUserId={cusUserId}>
          <AdminBottomTab />
      </CustomerPropertiesProvider>
    </CustomerProvider>
    </RefreshProvider>
  );
};

export default AdminTabEntry;
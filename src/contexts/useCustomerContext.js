import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const [globalCustomerId, setGlobalCustomerId] = useState(null);

  return (
    <CustomerContext.Provider value={{ globalCustomerId, setGlobalCustomerId }}>
      {children}
    </CustomerContext.Provider>
  );
};

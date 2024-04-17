import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCustomerProperties } from '../apifunctions/fetchCustomerPropertiesApi'; // Adjust the import path as needed

// Create a context for customer properties
const CustomerPropertiesContext = createContext();

// Provider component for customer properties
export const CustomerPropertiesProvider = ({ children}) => {
  const [customerProperties, setCustomerProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesResponse = await fetchCustomerProperties();
        setCustomerProperties(propertiesResponse || []);
        console.log(propertiesResponse);
      } catch (error) {
        console.error('Failed to fetch customer properties:', error);
      }
    };

      fetchProperties();
  }, []);

  return (
    <CustomerPropertiesContext.Provider value={{ customerProperties, setCustomerProperties }}>
      {children}
    </CustomerPropertiesContext.Provider>
  );
};

// Hook to use customer properties in any component
export const useCustomerProperties = () => useContext(CustomerPropertiesContext);
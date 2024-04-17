import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProperties } from '../apifunctions/fetchPropertiesApi';

// Create a context
const PropertiesContext = createContext();

// Provider component
export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties here or provide a method to do so
    const fetchPropertiesDetails = async () => {
      const fetchedProperties = await fetchProperties();
      setProperties(fetchedProperties);
      console.log(fetchedProperties)
    };

    fetchPropertiesDetails();
  }, []);

  return (
    <PropertiesContext.Provider value={{ properties, setProperties }}>
      {children}
    </PropertiesContext.Provider>
  );
};

// Hook to use properties in any component
export const useProperties = () => useContext(PropertiesContext);

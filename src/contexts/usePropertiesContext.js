import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProperties } from '../apifunctions/fetchPropertiesApi';

// Create a context
const PropertiesContext = createContext();

// Provider component
export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [nextGlobalPageUrl, setGlobalNextPageUrl] = useState(null);

  useEffect(() => {
    // Fetch properties here or provide a method to do so
    const fetchPropertiesDetails = async () => {
      const { properties: fetchedProperties, nextPageUrl: nextPage }= await fetchProperties();
      setProperties(fetchedProperties);
      setGlobalNextPageUrl(nextPage)
    };

    fetchPropertiesDetails();
  }, []);

  return (
    <PropertiesContext.Provider value={{ properties, setProperties, nextGlobalPageUrl, setGlobalNextPageUrl}}>
      {children}
    </PropertiesContext.Provider>
  );
};

// Hook to use properties in any component
export const useProperties = () => useContext(PropertiesContext);

import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAdminProperties } from '../apifunctions/fetchAdminPropertiesApi';


const AdminPropertiesContext = createContext();

export const AdminPropertiesProvider = ({ children }) => {
  const [adminProperties, setAdminProperties] = useState([]);
  const [nextGlobalPageUrl, setGlobalNextPageUrl] = useState(null);

  useEffect(() => {
    // Fetch properties here or provide a method to do so
    const fetchPropertiesDetails = async () => {
      const { properties: fetchedProperties, nextPageUrl: nextPage } = await fetchAdminProperties();
      setAdminProperties(fetchedProperties);
      setGlobalNextPageUrl(nextPage)
    };

    fetchPropertiesDetails();
  }, []);
  return (
    <AdminPropertiesContext.Provider value={{ adminProperties, setAdminProperties, nextGlobalPageUrl, setGlobalNextPageUrl}}>
      {children}
    </AdminPropertiesContext.Provider>
  );
};

export const useAdminProperties = () => useContext(AdminPropertiesContext);

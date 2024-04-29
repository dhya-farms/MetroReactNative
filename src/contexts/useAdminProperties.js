import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAdminProperties } from '../apifunctions/fetchAdminPropertiesApi';


const AdminPropertiesContext = createContext();

export const AdminPropertiesProvider = ({ children }) => {
  const [adminProperties, setAdminProperties] = useState([]);

  useEffect(() => {
    // Fetch properties here or provide a method to do so
    const fetchPropertiesDetails = async () => {
      const fetchedProperties = await fetchAdminProperties();
      setAdminProperties(fetchedProperties);
    };

    fetchPropertiesDetails();
  }, []);

  return (
    <AdminPropertiesContext.Provider value={{ adminProperties, setAdminProperties }}>
      {children}
    </AdminPropertiesContext.Provider>
  );
};

export const useAdminProperties = () => useContext(AdminPropertiesContext);

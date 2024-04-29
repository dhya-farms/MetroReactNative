import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchSoUsers } from '../apifunctions/fetchSoApi';
 // Adjust the import path

const SoUserContext = createContext();

export const useSoUsers = () => useContext(SoUserContext);

export const SoUserProvider = ({ children }) => {
    const [soUsers, setSoUsers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedSOData = await fetchSoUsers(); // Assuming fetchCustomers returns the data directly
            if (fetchedSOData.error) {
                console.error(fetchedSOData.error);
              } else {
                const transformedData = fetchedSOData.details.results.map(user => ({
                  id: user.id,
                  name: user.name,
                  number: user.mobile_no,
                  mailId: user.email,
                  points: '10Metro Points',  // Dummy data
                  clients: '5 Clients',  // Dummy data
                  source: require('../../assets/images/soperson.png')  // Assuming a placeholder image
                }));
                setSoUsers(transformedData);
                console.log('global', transformedData)
              }
        };
        loadData();
    }, []);

    return (
        <SoUserContext.Provider value={soUsers}>
            {children}
        </SoUserContext.Provider>
    );
};
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchSoUsers } from '../apifunctions/fetchSoApi';
 // Adjust the import path

const SoUserContext = createContext();

export const useSoUsers = () => useContext(SoUserContext);

export const SoUserProvider = ({ children }) => {
    const [soUsers, setSoUsers] = useState([]);
    const [nextSoPageUrl, setNextSoPageUrl] = useState(null)

    useEffect(() => {
        const loadData = async () => {
          const {data: fetchedSOData, nextPageUrl: nextPage} = await fetchSoUsers(); // Assuming fetchCustomers returns the data directly
            if (fetchedSOData.error) {
                console.error(fetchedSOData.error);
              } else {
                const transformedData = fetchedSOData.results.map(user => ({
                  id: user.id,
                  name: user.name,
                  number: user.mobile_no,
                  mailId: user.email,
                  created_at: user.created_at,
                  points: '10Metro Points',  // Dummy data
                  clients: '5 Clients',  // Dummy data
                  source: require('../../assets/images/soperson.png')  // Assuming a placeholder image
                }));

                transformedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setSoUsers(transformedData);
                setNextSoPageUrl(nextPage)
              }
        };
        loadData();
    }, []);

    return (
        <SoUserContext.Provider value={{soUsers, nextSoPageUrl, setNextSoPageUrl}}>
            {children}
        </SoUserContext.Provider>
    );
};
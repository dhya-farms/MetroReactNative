import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchSoCustomers } from '../apifunctions/fetchSoCustomersApi';
 // Adjust the import path

const SoCustomerContext = createContext();

export const useSoCustomers = () => useContext(SoCustomerContext);

export const SoCustomerProvider = ({ children }) => {
    const [soCustomers, setSoCustomers] = useState([]);
    const [nextSoGlobalPageUrl, setSoNextGlobalPageUrl] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const { customers: fetchedCustomers, nextPageUrl: nextPage } = await fetchSoCustomers(); // Assuming fetchCustomers returns the data directly
            if (!fetchedCustomers.error) {
                setSoCustomers(fetchedCustomers);
                setSoNextGlobalPageUrl(nextPage)
            }
        };
        loadData();
    }, []);

    return (
        <SoCustomerContext.Provider value={{soCustomers, nextSoGlobalPageUrl, setSoNextGlobalPageUrl}}>
            {children}
        </SoCustomerContext.Provider>
    );
};
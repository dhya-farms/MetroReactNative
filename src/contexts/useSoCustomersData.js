import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchSoCustomers } from '../apifunctions/fetchSoCustomersApi';
 // Adjust the import path

const SoCustomerContext = createContext();

export const useSoCustomers = () => useContext(SoCustomerContext);

export const SoCustomerProvider = ({ children }) => {
    const [soCustomers, setSoCustomers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedCustomers = await fetchSoCustomers(); // Assuming fetchCustomers returns the data directly
            if (!fetchedCustomers.error) {
                setSoCustomers(fetchedCustomers);
            }
        };
        loadData();
    }, []);

    return (
        <SoCustomerContext.Provider value={soCustomers}>
            {children}
        </SoCustomerContext.Provider>
    );
};
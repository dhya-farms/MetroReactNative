import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCustomers } from '../apifunctions/fetchCustomerApi';
 // Adjust the import path

const CustomerContext = createContext();

export const useCustomers = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedCustomers = await fetchCustomers(); // Assuming fetchCustomers returns the data directly
            if (!fetchedCustomers.error) {
                setCustomers(fetchedCustomers);
            }
        };
        loadData();
    }, []);

    return (
        <CustomerContext.Provider value={customers}>
            {children}
        </CustomerContext.Provider>
    );
};
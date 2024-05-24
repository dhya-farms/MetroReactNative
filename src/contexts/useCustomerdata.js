import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCustomers } from '../apifunctions/fetchCustomerApi';
 // Adjust the import path

const CustomerContext = createContext();

export const useCustomers = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [nextGlobalCustomerPageUrl, setNextGlobalCustomerPageUrl] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            const {customers: fetchedCustomers, nextPageUrl: nextPage} = await fetchCustomers(); // Assuming fetchCustomers returns the data directly
            if (!fetchedCustomers.error) {
                setCustomers(fetchedCustomers);
                setNextGlobalCustomerPageUrl(nextPage)
            }
        };
        loadData();
    }, []);

    return (
        <CustomerContext.Provider value={{customers, nextGlobalCustomerPageUrl, setNextGlobalCustomerPageUrl}}>
            {children}
        </CustomerContext.Provider>
    );
};
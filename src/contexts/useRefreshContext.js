import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
    const [dummyState, setDummyState] = useState(false); // State to trigger refresh

    const triggerDataRefresh = () => {
        setDummyState(prev => !prev); // Toggle state to trigger refresh
    };

    return (
        <RefreshContext.Provider value={{ dummyState, triggerDataRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};

export const useRefresh = () => useContext(RefreshContext);
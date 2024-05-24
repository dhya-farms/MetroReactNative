import React, { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
    const [dummyState, setDummyState] = useState(false); // State to trigger refresh

    const triggerDataRefresh = () => {
        console.log("Triggering data refresh");
        setDummyState(prev => !prev);
    };
    
    return (
        <RefreshContext.Provider value={{ dummyState, triggerDataRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};

export const useRefresh = () => useContext(RefreshContext);
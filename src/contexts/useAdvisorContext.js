import React, { createContext, useState, useContext } from 'react';

const AdvisorContext = createContext();

export const useAdvisor = () => useContext(AdvisorContext);

export const AdvisorProvider = ({ children }) => {
    const [advisorMobile, setAdvisorMobile] = useState(null);
    const [advisorMail, setAdvisorMail] = useState(null);
  
    console.log("Advisor Mobile in Context: ", advisorMobile); // Debug: Check if the value is set
  
    const setAdvisorDetails = (mobileDetails, MailDetails) => {
      setAdvisorMobile(mobileDetails);
      setAdvisorMail(MailDetails);
      console.log("Setting Advisor Mobile: ", mobileDetails); // Debug: Verify this runs
    };
  
    return (
      <AdvisorContext.Provider value={{ advisorMobile, setAdvisorMobile, advisorMail, setAdvisorMail, setAdvisorDetails }}>
        {children}
      </AdvisorContext.Provider>
    );
  };

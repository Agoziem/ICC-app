"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const EmailContext = createContext();

const EmailContextProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  
  return (
    <EmailContext.Provider
      value={{
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

const useEmailContext = () => {
  return useContext(EmailContext);
};

export { EmailContextProvider, useEmailContext };

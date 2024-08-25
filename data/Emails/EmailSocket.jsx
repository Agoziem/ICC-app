"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const EmailSocketContext = createContext();

const EmailSocketContextProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  
  return (
    <EmailSocketContext.Provider
      value={{
      }}
    >
      {children}
    </EmailSocketContext.Provider>
  );
};

const useEmailSocketContext = () => {
  return useContext(EmailSocketContext);
};

export { EmailSocketContextProvider, useEmailSocketContext };

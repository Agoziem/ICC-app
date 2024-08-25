"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const NotificationsSocketContext = createContext();

const NotificationsSocketContextProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  
  return (
    <NotificationsSocketContext.Provider
      value={{
      }}
    >
      {children}
    </NotificationsSocketContext.Provider>
  );
};

const useNotificationsSocketContext = () => {
  return useContext(NotificationsSocketContext);
};

export { NotificationsSocketContextProvider, useNotificationsSocketContext };

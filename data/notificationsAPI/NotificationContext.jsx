"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const NotificationsContext = createContext(null);

const NotificationsContextProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};

export { NotificationsContextProvider, useNotificationsContext };

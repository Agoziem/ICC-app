"use client";
import React, { createContext, useEffect, useState } from 'react';
// import useLocalStorage from '@/hooks/useLocalStorage';
const OrganizationContext = createContext();

const OrganizationContextProvider = ({ children }) => {
  const [organizationID,setorganizationID] = useState(1)
  const [organizationData, setOrganizationData] = useState({});

  useEffect(() => {
    if(organizationID){
      fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/organization/${organizationID}/`)
      .then((res) => res.json())
      .then((data) => {
        setOrganizationData(data);
      });
    }
  }, [organizationID]);


  return (
    <OrganizationContext.Provider value={{ organizationData, setOrganizationData,setorganizationID }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationContext, OrganizationContextProvider };

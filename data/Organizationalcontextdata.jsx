"use client";
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';
const OrganizationContext = createContext();

const OrganizationContextProvider = ({ children }) => {
  const [organizationID,setorganizationID] = useState(1)
  const [OrganizationData, setOrganizationData] = useState({});
  const [storedOrganizationalData, setStoredOrganizationalData] = useLocalStorage('OrganizationData', OrganizationData)

  useEffect(() => {
    const isEmptyData = !storedOrganizationalData || Object.keys(storedOrganizationalData).length === 0;
    if (isEmptyData && organizationID) {
      fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/organization/${organizationID}/`)
        .then((res) => res.json())
        .then((data) => {
          setOrganizationData(data);
          setStoredOrganizationalData(data);
        })
        .catch((error) => {
          console.error('Error fetching organization data:', error);
        });
    } else {
      setOrganizationData(storedOrganizationalData);
    }
  }, [organizationID,storedOrganizationalData]);

  // store data to Local Storage when the OrganizationData changes
  useEffect(() => {
    setStoredOrganizationalData(OrganizationData);
  }, [OrganizationData]);


  return (
    <OrganizationContext.Provider value={{ OrganizationData, setOrganizationData,setorganizationID }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationContext, OrganizationContextProvider };

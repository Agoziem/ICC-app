"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({});

  
  const [storedAdminData, setStoredAdminData] = useLocalStorage('adminData', adminData)

  useEffect(() => {
    if(storedAdminData){
      setAdminData(storedAdminData)
    }
  },[storedAdminData])

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };

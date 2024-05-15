"use client";
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const [storedUserData, setStoredUserData] = useLocalStorage('userData', userData)

  useEffect(() => {
    if (storedUserData) {
      setUserData(storedUserData)
    }
  }, [storedUserData])

  // Step 4: Provide the context value to children components
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
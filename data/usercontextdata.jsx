"use client";
import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "next-auth/react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [userOrder, setUserOrder] = useState([]);

  // ----------------------------------------------------
  // get it from local storage if it's there on mount
  // ----------------------------------------------------

  const [storedUserOrder, setStoredUserOrder] = useLocalStorage(
    "userOrder",
    userOrder
  );

  // ----------------------------------------------------
  // set it to local storage if it's there on mount and not empty
  // ----------------------------------------------------
  useEffect(() => {
    if (session && session.user.id) {
      setUserData(session.user);
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (session && session.user.id) {
      if (storedUserOrder && storedUserOrder.length > 0) {
        setUserOrder(storedUserOrder);
      } else {
        fetchUserOrder();
      }
    }
  }, [session?.user.id]);

  // ----------------------------------------------------
  // fetch data from the backend and update LocalStorage
  // ----------------------------------------------------

  const fetchUserOrder = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/paymentsbyuser/${session?.user.id}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserOrder(data);
      })
      .catch((e) => console.log(e.message));
  };

  // ----------------------------------------------------
  // update local storage when the state changes
  // ----------------------------------------------------

  useEffect(() => {
    setStoredUserOrder(userOrder);
  }, [userOrder]);

  // ----------------------------------------------------
  // update userOrder
  // ----------------------------------------------------
  const updateUserOrder = (item) => {
    const updatedOrder = userOrder.map((order) => {
      if (order.id === item.id) {
        return { ...order, status: item.status };
      }
      return order;
    });
    setStoredUserOrder(updatedOrder);
    setUserOrder(updatedOrder);
  };

  // ----------------------------------------------------
  // delete userOrder
  // ----------------------------------------------------
  const deleteUserOrder = (item) => {
    const updatedOrder = userOrder.filter((order) => order.id !== item.id);
    setStoredUserOrder(updatedOrder);
    setUserOrder(updatedOrder);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        userOrder,
        setUserOrder,
        updateUserOrder,
        deleteUserOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => React.useContext(UserContext);

export { useUserContext, UserContextProvider };

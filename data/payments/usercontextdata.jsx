"use client";
import React, { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [userOrder, setUserOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  // ----------------------------------------------------
  // get user data from session on mount
  // ----------------------------------------------------
  useEffect(() => {
    if (session && session.user.id) {
      setUserData(session.user);
      fetchUserOrder(session.user.id);
    }
  }, [session]);

  // ----------------------------------------------------
  // fetch data from the backend
  // ----------------------------------------------------
  const fetchUserOrder = (userId) => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/paymentsbyuser/${userId}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserOrder(data.orders);
        setTotalOrder(data.total);
      })
      .catch((e) => console.log(e.message));
  };

  // ----------------------------------------------------
  // update userOrder
  // ----------------------------------------------------
  const updateUserOrder = (item) => {
    const updatedOrder = userOrder.map((order) => {
      if (order.id === item.id) {
        return item;
      }
      return order;
    });
    setUserOrder(updatedOrder);
  };

  // ----------------------------------------------------
  // delete userOrder
  // ----------------------------------------------------
  const deleteUserOrder = (item) => {
    const updatedOrder = userOrder.filter((order) => order.id !== item.id);
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
        totalOrder,
        setTotalOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => React.useContext(UserContext);

export { useUserContext, UserContextProvider };

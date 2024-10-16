"use client";
import React, { createContext } from "react";
import { useSession } from "next-auth/react";
import {  fetchPayments, paymentsAPIendpoint } from "./fetcher";
import useSWR from "swr";

/**
 * @typedef {Object} UserOrderContextValue
 * @property {boolean} loadingUserOrder - Indicates if the user order is loading.
 * @property {Function} mutate - SWR mutate function to refresh user order data.
 * @property {Orders | undefined} userOrders - List of user orders or undefined if not fetched.
 */

/** @type {React.Context<UserOrderContextValue | null>} */
const UserContext = createContext(null);

/**
 * UserContextProvider component that wraps its children with the user context.
 * 
 * @param {{ children: React.ReactNode }} props - The children elements to render inside the provider.
 * @returns {JSX.Element} The UserContext provider component.
 */
const UserContextProvider = ({ children }) => {
  const { data: session } = useSession();

  // Fetch user order using SWR
  const {
    data: userOrders,
    isLoading: loadingUserOrder,
    error: error,
    mutate,
  } = useSWR(
    session?.user.id
      ? `${paymentsAPIendpoint}/paymentsbyuser/${session.user.id}/`
      : null,
    fetchPayments,
    {
      onSuccess: (data) =>
        data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    }
  );

  return (
    <UserContext.Provider
      value={{
        loadingUserOrder,
        mutate,
        userOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access the user context values.
 *
 * @returns {UserOrderContextValue | null} The current user context value.
 */
const useUserContext = () => React.useContext(UserContext);

export { useUserContext, UserContextProvider };

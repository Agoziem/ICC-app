"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/components/custom/Modal/modal";
import { fetchPayments, paymentsAPIendpoint } from "./fetcher";
import useSWR from "swr";

/**
 * @typedef {Object} OrdersContextValue
 * @property {boolean} loadingOrders - Indicates if the user order is loading.
 * @property {Function} mutate - SWR mutate function to refresh user order data.
 * @property {Orders | undefined} orders - List of user orders or undefined if not fetched.
 * @property {(service: any) => void} openModal
 * @property {() => void} closeModal
 */

/** @type {React.Context<OrdersContextValue | null>} */
const AdminContext = createContext(null);

/**
 * AdminContextProvider component that wraps its children with the user context.
 *
 * @param {{ children: React.ReactNode }} props - The children elements to render inside the provider.
 * @returns {JSX.Element} The UserContext provider component.
 */
const AdminContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);
  const { data: session } = useSession();
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

  // Fetch user order using SWR
  const {
    data: orders,
    isLoading: loadingOrders,
    error: ordersError,
    mutate,
  } = useSWR(
    session?.user.id
      ? `${paymentsAPIendpoint}/payments/${Organizationid}/`
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

  // ----------------------------------------------------
  // Open Description Modal
  // ----------------------------------------------------
  const openModal = (service) => {
    setModalService(service);
    setShowModal(true);
  };

  // ----------------------------------------------------
  // Close Description Modal
  // ----------------------------------------------------
  const closeModal = () => {
    setModalService(null);
    setShowModal(false);
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        mutate,
        loadingOrders,
        openModal, // Open Description Modal
        closeModal, // Close Description Modal
      }}
    >
      {children}

      {/* Modal for Service Description */}
      <Modal showmodal={showModal} toggleModal={closeModal}>
        <div className="">
          <h5 className="mb-3">Service Description</h5>
          <div className="modal-body">
            <p>{modalService?.description}</p>
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => closeModal()}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </AdminContext.Provider>
  );
};

/**
 * Hook to access the user context values.
 *
 * @returns {OrdersContextValue | null} The current user context value.
 */
const useAdminContext = () => useContext(AdminContext);

export { useAdminContext, AdminContextProvider };

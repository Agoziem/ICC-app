"use client";

import React, { createContext, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/components/custom/Modal/modal";
import {
  fetchPayments,
  addPayment,
  updatePayment,
  deletePayment,
} from "./fetcher";
import { useQuery, useMutation, useQueryClient } from "react-query";

/**
 * @typedef {Object} OrdersContextValue
 * @property {boolean} loadingOrders - Indicates if the user orders are loading.
 * @property {Function} refetchOrders - Function to refetch user orders data.
 * @property {Orders | undefined} orders - List of user orders or undefined if not fetched.
 * @property {(service: any) => void} openModal - Function to open a modal.
 * @property {() => void} closeModal - Function to close a modal.
 * @property {Function} addPayment - Function to add a payment.
 * @property {Function} updatePayment - Function to update a payment.
 * @property {Function} deletePayment - Function to delete a payment.
 */

/** @type {React.Context<OrdersContextValue | null>} */
const AdminContext = createContext(null);

/**
 * AdminContextProvider component that wraps its children with the admin context.
 *
 * @param {{ children: React.ReactNode }} props - The children elements to render inside the provider.
 * @returns {JSX.Element} The AdminContext provider component.
 */
const AdminContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);
  const { data: session } = useSession();
  const Organizationid = process.env.NEXT_PUBLIC_ORGANIZATION_ID;

  // React Query: Query Client for cache management
  const queryClient = useQueryClient();

  // React Query: Fetch Orders
  const {
    data: orders,
    isLoading: loadingOrders,
    refetch: refetchOrders,
  } = useQuery(
    ["payments", Organizationid],
    () => fetchPayments(`${Organizationid}/`),
    {
      enabled: !!session?.user?.id, // Fetch only if user is logged in
      onSuccess: (data) =>
        data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    }
  );

  // React Query: Add Payment Mutation
  const addPaymentMutation = useMutation(addPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["payments"]); // Refresh payments
    },
  });

  // React Query: Update Payment Mutation
  const updatePaymentMutation = useMutation(updatePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["payments"]); // Refresh payments
    },
  });

  // React Query: Delete Payment Mutation
  const deletePaymentMutation = useMutation(deletePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["payments"]); // Refresh payments
    },
  });

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
        loadingOrders,
        refetchOrders,
        openModal,
        closeModal,
        addPayment: addPaymentMutation.mutate,
        updatePayment: updatePaymentMutation.mutate,
        deletePayment: deletePaymentMutation.mutate,
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
 * Hook to access the admin context values.
 *
 * @returns {OrdersContextValue | null} The current admin context value.
 */
const useAdminContext = () => useContext(AdminContext);

export { useAdminContext, AdminContextProvider };

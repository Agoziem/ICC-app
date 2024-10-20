"use client";
import React, { createContext, useEffect, useState } from "react";
import Modal from "@/components/custom/Modal/modal";
import useSWR from "swr";
import { fetchOrganization, MainAPIendpoint } from "./fetcher";

const OrganizationContext = createContext(null);

const OrganizationContextProvider = ({ children }) => {
  const organizationID = process.env.NEXT_PUBLIC_ORGANIZATION_ID
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);

  const {
    data: OrganizationData,
    isLoading,
    error,
    mutate,
  } = useSWR(
    `${MainAPIendpoint}/organization/${organizationID}/`,
    fetchOrganization
  );

  const openModal = (service) => {
    setModalService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalService(null);
    setShowModal(false);
  };

  return (
    <OrganizationContext.Provider
      value={{
        OrganizationData,
        isLoading,
        error,
        mutate,
        organizationID,
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
    </OrganizationContext.Provider>
  );
};

export { OrganizationContext, OrganizationContextProvider };

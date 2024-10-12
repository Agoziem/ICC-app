"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Modal from "@/components/custom/Modal/modal";

const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);
  const { data: session } = useSession();
  const [organizationID, setOrganizationID] = useState(1);
  const [adminData, setAdminData] = useState({});
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // ----------------------------------------------------
  // Get user data from session on mount
  // ----------------------------------------------------
  useEffect(() => {
    if (session && session.user.id) {
      setAdminData(session.user);
      fetchOrders(organizationID);
      fetchCustomers(organizationID);
    }
  }, [session, organizationID]);

  // ----------------------------------------------------
  // Fetch data from the backend
  // ----------------------------------------------------
  const fetchOrders = (organizationId) => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/payments/${organizationId}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((e) => console.log(e.message));
  };

  const fetchCustomers = (organizationId) => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/getcustomerscount/${organizationId}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
        setTotalCustomers(data.totalcustomers);
        setTotalOrders(data.totalorders);
      })
      .catch((e) => console.log(e.message));
  };

  // ----------------------------------------------------
  // Update an order function
  // ----------------------------------------------------
  const updateOrder = (item) => {
    const updatedOrder = orders.map((order) => {
      if (order.id === item.id) {
        return item;
      }
      return order;
    });
    setOrders(updatedOrder);
  };

  // ----------------------------------------------------
  // Delete an order function
  // ----------------------------------------------------
  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };


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
        adminData,
        setAdminData,
        orders,
        setOrders,
        updateOrder,
        deleteOrder,
        customers,
        setCustomers,
        totalCustomers,
        setTotalCustomers,
        totalOrders,
        setTotalOrders,
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
            <button
              className="btn btn-primary"
              onClick={() => closeModal()}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </AdminContext.Provider>
  );
};

const useAdminContext = () => useContext(AdminContext);

export { useAdminContext, AdminContextProvider };

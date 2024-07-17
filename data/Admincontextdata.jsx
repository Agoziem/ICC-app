"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "next-auth/react";
import Modal from "@/components/Modal/modal";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);
  const { data: session } = useSession();
  const [organizationID, setorganizationID] = useState(1);
  const [adminData, setAdminData] = useState({});
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // ------------------------------
  // get it from local storage
  // ------------------------------

  const [storedOrders, setStoredOrders] = useLocalStorage("orders", orders);

  // -----------------------------------------------------------------
  // set it to local storage if they are there and not empty on mount
  // -----------------------------------------------------------------

  useEffect(() => {
    if (storedOrders && storedOrders.length > 0) {
      setOrders(storedOrders);
    } else {
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    if (organizationID) {
      fetchCustomers();
    }
  }, [organizationID]);

  useEffect(() => {
    if (session && session.user.id) {
      setAdminData(session.user);
    }
  }, [session?.user.id]);

  // ---------------------------------------------------------------------
  // fetch Data from the server and set it to state and update local storage
  // ----------------------------------------------------------------------

  const fetchOrders = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/payments/${organizationID}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((e) => console.log(e.message));
  };

  const fetchCustomers = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/paymentsapi/getcustomerscount/${organizationID}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
        setTotalCustomers(data.totalcustomers)
        setTotalOrders(data.totalorders)
      })
      .catch((e) => console.log(e.message));
  };

  // -----------------------------------------------------------
  // update Local storage when the state changes
  // -----------------------------------------------------------

  useEffect(() => {
    setStoredOrders(orders);
  }, [orders]);

  // -----------------------------------------------------------
  // update an order & service function
  // -----------------------------------------------------------
  const updateOrder = (item) => {
    const updatedOrder = orders.map((order) => {
      if (order.id === item.id) {
        return { ...order, status: item.status };
      }
      return order;
    });
    setOrders(updatedOrder);
  };

  // -----------------------------------------------------------
  // delete a service & Order function
  // -----------------------------------------------------------
  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  }
  
  const openModal = (service) => {
    setModalService(service);
    setShowModal(true);
  };

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

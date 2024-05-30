"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "next-auth/react";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [organizationID, setorganizationID] = useState(1);
  const [adminData, setAdminData] = useState({});
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [orders, setOrders] = useState([]);

  // ------------------------------
  // get it from local storage
  // ------------------------------

  const [storedServices, setStoredServices] = useLocalStorage(
    "services",
    services
  );
  const [storedApplications, setStoredApplications] = useLocalStorage(
    "applications",
    applications
  );
  const [storedOrders, setStoredOrders] = useLocalStorage("orders", orders);

  // -----------------------------------------------------------------
  // set it to local storage if they are there and not empty on mount
  // -----------------------------------------------------------------
  useEffect(() => {
    if (storedServices && storedServices.length > 0 && storedApplications && storedApplications.length > 0) {
      setServices(storedServices);
    } else {
      fetchServices();
    }
  }, []);


  useEffect(() => {
    if (storedOrders && storedOrders.length > 0) {
      setOrders(storedOrders);
    } else {
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    if (session && session.user.id) {
      setAdminData(session.user);
    }
  }, [session?.user.id]);

  // ---------------------------------------------------------------------
  // fetch Data from the server and set it to state and update local storage
  // ----------------------------------------------------------------------

  const fetchServices = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/services/${organizationID}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data.filter((item) => item.category === "service").map((item) => item));
        setApplications(data.filter((item) => item.category === "application").map((item) => item));
      })
      .catch((e) => console.log(e.message));
  };

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

  // -----------------------------------------------------------
  // update Local storage when the state changes
  // -----------------------------------------------------------
  useEffect(() => {
    setStoredServices(services);
  }, [services]);


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

  const updateService = (item) => {
    const updatedServices = services.map((service) => {
      if (service.id === item.id) {
        return { ...service, item };
      }
      return service;
    });
    setServices(updatedServices);
  }


  // -----------------------------------------------------------
  // delete a service & Order function
  // -----------------------------------------------------------
  const deleteService = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  }
  

  return (
    <AdminContext.Provider
      value={{
        adminData,
        setAdminData,
        services,
        setServices,
        updateService,
        deleteService,
        applications,
        setApplications,
        orders,
        setOrders,
        updateOrder,
        deleteOrder,
        
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

const useAdminContext = () => useContext(AdminContext);

export { useAdminContext, AdminContextProvider };

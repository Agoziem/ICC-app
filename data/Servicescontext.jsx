"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { OrganizationContext } from "./Organizationalcontextdata";
import { converttoformData } from "@/utils/formutils";

// Create the context
const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const { organizationID } = useContext(OrganizationContext);
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/services/${organizationID}/`
      );
      if (response.ok) {
        const data = await response.json();
        setServices(
          data
            .filter((item) => item.category.category !== "application")
            .map((item) => item)
        );
        setApplications(
          data
            .filter((item) => item.category.category === "application")
            .map((item) => item)
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching services" };
    }
  };

  useEffect(() => {
    if (organizationID) fetchServices();
  }, [organizationID]);

  // ------------------------------------------------------
  // Fetch a single service by ID
  // ------------------------------------------------------
  const fetchServiceById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/service/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching service" };
    }
  };

  // ------------------------------------------------------
  // fetch service by token
  // ------------------------------------------------------
  const fetchServiceByToken = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/service_by_token/${token}/`
      );
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        return data;
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error fetching service" };
    }
  };

  // ------------------------------------------------------
  // Create a new service
  // ------------------------------------------------------
  const createService = async (service) => {
    setLoading(true);
    const formData = converttoformData(service, ["category", "organization"]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/add_service/${organizationID}/`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        setServices([...services, data]);
        setLoading(false);
        return { type: "success", message: "Service created successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error creating service" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error creating service" };
    }
  };

  // ------------------------------------------------------
  // Update an existing service
  // ------------------------------------------------
  const updateService = async (id, updatedService) => {
    setLoading(true);
    const formData = converttoformData(updatedService, [
      "category",
      "organization",
    ]);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/update_service/${id}/`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        const updatedService = await response.json();
        setServices(
          services.map((service) =>
            service.id === updatedService.id ? updatedService : service
          )
        );
        setLoading(false);
        return { type: "success", message: "Service updated successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error updating service" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error updating service" };
    }
  };

  // ------------------------------------------------------
  // Delete a service
  // ------------------------------------------------------
  const deleteService = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/delete_service/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setServices(services.filter((service) => service.id !== id));
        setLoading(false);
        return { type: "success", message: "Service deleted successfully" };
      } else {
        setLoading(false);
        return { type: "danger", message: "Error deleting service" };
      }
    } catch (error) {
      setLoading(false);
      return { type: "danger", message: "Error deleting service" };
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        setServices,
        applications,
        setApplications,
        fetchServices,
        fetchServiceById,
        fetchServiceByToken,
        createService,
        updateService,
        deleteService,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

const useServiceContext = () => {
  return useContext(ServiceContext);
};

export { ServiceProvider, useServiceContext };

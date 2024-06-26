"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { createContext, useEffect, useState } from "react";
const OrganizationContext = createContext();

const OrganizationContextProvider = ({ children }) => {
  const [organizationID, setorganizationID] = useState(1);
  const [OrganizationData, setOrganizationData] = useState({});
  const [staffs, setStaffs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [depts, setDepts] = useState([]);
  const [storedOrganizationalData, setStoredOrganizationalData] =
    useLocalStorage("OrganizationData", OrganizationData);
  
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const isEmptyData =
      !storedOrganizationalData ||
      Object.keys(storedOrganizationalData).length === 0;
    if (isEmptyData && organizationID) {
      fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/organization/${organizationID}/`
      )
        .then((res) => res.json())
        .then((data) => {
          setOrganizationData(data);
          setStoredOrganizationalData(data);
          setStaffs(data.staffs);
          setTestimonials(data.testimonials);
          setSubscriptions(data.subscriptions);
          console.log(data.departments)
          setDepts(data.departments);
        })
        .catch((error) => {
          console.error("Error fetching organization data:", error);
        });
    } else {
      setOrganizationData(storedOrganizationalData);
    }
  }, [organizationID, storedOrganizationalData]);
  

  // get messages
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/emailsapi/emails/${organizationID}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [organizationID]);

  // store data to Local Storage when the OrganizationData changes
  useEffect(() => {
    setStoredOrganizationalData(OrganizationData);
  }, [OrganizationData]);

  // get services
  const fetchServices = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/services/${organizationID}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((e) => console.log(e.message));
  };

  const fetchCategories = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/servicesapi/categories/`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (organizationID) {
      fetchServices();
      fetchCategories();
    }
  }, [organizationID]);

  return (
    <OrganizationContext.Provider
      value={{
        OrganizationData,
        setOrganizationData,
        setorganizationID,
        staffs,
        setStaffs,
        testimonials,
        setTestimonials,
        subscriptions,
        setSubscriptions,
        messages,
        setMessages,
        services,
        setServices,
        categories,
        setCategories,
        depts,
        setDepts,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationContext, OrganizationContextProvider };

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
  const [storedOrganizationalData, setStoredOrganizationalData] =
    useLocalStorage("OrganizationData", OrganizationData);

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
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationContext, OrganizationContextProvider };

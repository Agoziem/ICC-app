"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// ------------------------------------------------------
// Create the context
// ------------------------------------------------------
const WhatsappAPIContext = createContext();

const WhatsappAPIProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // ------------------------------------------------------
  // Fetch contacts
  // ------------------------------------------------------
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/contacts/`);
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts", error);
      }
    };

    fetchContacts();
  }, []);

  // ------------------------------------------------------
  // Fetch messages for a specific contact
  // ------------------------------------------------------
  useEffect(() => {
    if (selectedContact) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/messages/${selectedContact.id}/`);
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages", error);
        }
      };

      fetchMessages();
    }
  }, [selectedContact]);

  // ------------------------------------------------------
  // Send WhatsApp Template message
  // ------------------------------------------------------
  const sendWhatsappTemplateMessage = async (to_phone_number, template_name, language_code = "en_US") => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/send-template-message/`, {
        to_phone_number,
        template_name,
        language_code,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to send WhatsApp message", error);
      return { status: 'error', message: error.response.data };
    }
  };

  // ------------------------------------------------------
  // Fetch media by ID
  // ------------------------------------------------------
  const getMedia = async (media_id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/media/${media_id}/`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch media", error);
      return null;
    }
  };


  // ------------------------------------------------------
  // send message to the contact and returning the message
  // ------------------------------------------------------
  const sendMessage = async (messageData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/${selectedContact.id}/send_message/`, messageData);
      return response.data;
    } catch (error) {
      console.error("Failed to send message", error);
      return null;
    }
  };

  return (
    <WhatsappAPIContext.Provider
      value={{
        organizationID,
        contacts,
        messages,
        selectedContact,
        setSelectedContact,
        sendWhatsappTemplateMessage,
        sendMessage, // send Message to the selected contact
        getMedia,
      }}
    >
      {children}
    </WhatsappAPIContext.Provider>
  );
};

const useWhatsappAPIContext = () => {
  return useContext(WhatsappAPIContext);
};

export { WhatsappAPIProvider, useWhatsappAPIContext };

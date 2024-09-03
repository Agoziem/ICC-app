"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import SortContacts from "@/utils/sortcontacts";
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
  const [sendingMessage, setSendingMessage] = useState(false);
  const [atthebottom, setAtthebottom] = useState(false);

  // ------------------------------------------------------
  // Reference to the bottom of the chat messages
  // ------------------------------------------------------
  const bottomRef = useRef(null);

  // ------------------------------------------------------
  // function that scrolls to the bottom of the chat messages
  // ------------------------------------------------------
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    setAtthebottom(true);
  };

  // ------------------------------------------------------
  // Fetch contacts
  // ------------------------------------------------------
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/contacts/`
      );
      // Sort contacts by the most recent message timestamp
      const contacts = SortContacts(response.data);
      setContacts(contacts);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
    }
  };

  // ------------------------------------------------------
  // Fetch messages for a specific contact
  // ------------------------------------------------------
  useEffect(() => {
    if (selectedContact) {
      const allMessages = [
        ...selectedContact.recieved_messages,
        ...selectedContact.sent_messages,
      ];

      // Sort messages by timestamp
      allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setMessages(allMessages);
    } else {
      setMessages([]); // Clear messages when no contact is selected
    }
  }, [selectedContact]);

  // ------------------------------------------------------
  // Send WhatsApp Template message
  // ------------------------------------------------------
  const sendWhatsappTemplateMessage = async (
    to_phone_number,
    template_name,
    language_code = "en_US"
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/send-template-message/`,
        {
          to_phone_number,
          template_name,
          language_code,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to send WhatsApp message", error);
      return { status: "error", message: error.response.data };
    }
  };

  // ------------------------------------------------------
  // Fetch media by ID
  // ------------------------------------------------------
  const getMedia = async (media_id) => {
    console.log("Fetching media", media_id);
    try {
      // Fetch the media binary from Django backend
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/media/${media_id}/`,
        { responseType: 'arraybuffer' } // Ensure binary data is handled correctly
      );
      const blob = new Blob([response.data], { type: response.headers['content-type'] });      const url = URL.createObjectURL(blob);  
      return url;
    } catch (error) {
      console.error("Failed to fetch media", error);
      return null;
    }
  };

  // ------------------------------------------------------
  // send message to the contact and updating the UI
  // ------------------------------------------------------
  const sendMessage = async (messageData) => {
    try {
      setSendingMessage(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/whatsappAPI/${selectedContact.id}/send_message/`,
        messageData
      );
      // Append the new message to the messages state
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setContacts((prevContacts) => {
        const updatedContacts = [...prevContacts];
        const index = updatedContacts.findIndex(
          (contact) => contact.id === selectedContact.id
        );
        updatedContacts.splice(index, 1);
        updatedContacts.unshift(response.data.contact);
        return updatedContacts;
      });

      return response.data;
    } catch (error) {
      console.error("Failed to send message", error);
      return null;
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <WhatsappAPIContext.Provider
      value={{
        organizationID, // organization ID
        contacts, // contacts
        setContacts, // set contacts
        messages, // messages
        setMessages, // messages
        selectedContact, // selected contact
        fetchContacts, // fetch contacts
        setSelectedContact, // set the selected contact
        sendWhatsappTemplateMessage, // send WhatsApp Template message
        sendMessage, // send Message to the selected contact
        sendingMessage, // sending message status
        getMedia, // fetch media by ID
        bottomRef, // reference to the bottom of the chat messages
        scrollToBottom, // function that scrolls to the bottom of the chat messages
        atthebottom, // at the bottom of the chat messages
        setAtthebottom, // set at the bottom of the chat messages
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

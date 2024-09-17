"use client";
import React, { useCallback, useEffect } from "react";
import ContactCard from "./ContactCard";
import SearchInput from "../Inputs/SearchInput";
import "./whatsapp.css";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { MdOutlineContacts } from "react-icons/md";
import BackButton from "../backbutton/BackButton";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";

const Contacts = () => {
  const { contacts, setContacts } = useWhatsappAPIContext();
  const { generalSocket } = useWhatsappAPISocketContext();

  // -------------------------------------------------------------------------
  // Open Websocket to recieve immediate Contacts update
  // -------------------------------------------------------------------------
  useEffect(() => {
    // Attach event listeners for both WebSockets
    if (generalSocket) {
      generalSocket.onmessage = handleSocketMessage;
    }
    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      if (generalSocket) generalSocket.onmessage = null;
    };
  }, [generalSocket]);

  // ------------------------------------------------
  // handle the Socket Message
  // ------------------------------------------------
  const handleSocketMessage = useCallback((e) => {
    const data = JSON.parse(e.data);
    console.log("updating contact cards list operation");
    if (data.operation === "chat_message" && data.contact) {
      contactspostion(data);
    } else {
      updateContactsStatus(data);
    }
  }, []);


  // -------------------------------------------------------
  // for updating the contact card when a message comes
  // -------------------------------------------------------
  const contactspostion = (data) => {
    setContacts((prevContacts) => {
      const index = prevContacts.findIndex(
        (contact) => contact.id === data.contact.id
      );
      if (index === -1) {
        // Add new contact at the top
        return [data.contact, ...prevContacts];
      } else {
        // Move existing contact to the top
        const updatedContacts = [...prevContacts];
        updatedContacts.splice(index, 1);
        updatedContacts.unshift(data.contact);
        return updatedContacts;
      }
    });
  };


  // --------------------------------------------------------------------
  // for updating the contact messages status badge when a message comes
  // --------------------------------------------------------------------
  const updateContactsStatus = (data) => {
    setContacts((prevContacts) => {
      const updatedContacts = [...prevContacts];
      const index = updatedContacts.findIndex(
        (contact) => contact.id === parseInt(data.contact_id)
      );
      if (index !== -1) {
        const updatedContact = { ...updatedContacts[index] };
        updatedContact.recieved_messages = updatedContact.recieved_messages.map(
          (message) => {
            if (data.message.message_ids.includes(message.message_id)) {
              return { ...message, seen: true };
            }
            return message;
          }
        );
        updatedContacts.splice(index, 1, updatedContact);
      }
      return updatedContacts;
    });
  };

  return (
    <div>
      <div className="mb-2">
        <BackButton />
      </div>
      <div className="d-flex flex-wrap">
        <h4 className="flex-fill mb-3">WA Messages</h4>
        <div className="d-flex bg-primary-light">
          <button className="btn btn-sm btn-primary rounded me-2">
            All messages
          </button>
          <button
            className="btn btn-sm btn-primary rounded"
            style={{
              backgroundColor: "var(--bgDarkerColor)",
              borderColor: "var(--bgDarkerColor)",
            }}
          >
            Unread
          </button>
        </div>
      </div>
      <hr />
      <div className="mb-4">
        <SearchInput />
      </div>
      <div className="Contacts d-flex flex-column g-1 pe-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        ) : (
          <div className="text-center mt-4">
            <div className="mb-2">
              <MdOutlineContacts
                style={{
                  fontSize: "3.5rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
            </div>
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;

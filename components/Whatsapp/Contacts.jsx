"use client";
import React, { useEffect, useCallback } from "react";
import ContactCard from "./ContactCard";
import SearchInput from "../Inputs/SearchInput";
import "./whatsapp.css";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { MdOutlineContacts } from "react-icons/md";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";
import BackButton from "../backbutton/BackButton";

const Contacts = () => {
  const { contacts, setContacts } = useWhatsappAPIContext();
  const { socket } = useWhatsappAPISocketContext();

  // Function to handle incoming contact updates when a new message is received
  const handleIncomingContact = useCallback(
    (data) => {
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
    },
    [setContacts]
  );

  // ------------------------------------------------------
  // Listen for socket messages to update contacts list
  // ------------------------------------------------------
  useEffect(() => {
    if (!socket) return;
    const handleSocketMessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.operation === "chat_message" && data.contact) {
        handleIncomingContact(data);
      }
    };
    socket.addEventListener("message", handleSocketMessage);
    // Clean up the event listener on component unmount
    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket, handleIncomingContact]);

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

"use client";
import React, { useEffect } from "react";
import ContactCard from "./ContactCard";
import SearchInput from "../Inputs/SearchInput";
import "./whatsapp.css";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { MdOutlineContacts } from "react-icons/md";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";

const Contacts = () => {
  const { contacts } = useWhatsappAPIContext();
  const { socket } = useWhatsappAPISocketContext();

  useEffect(() => {
    if (socket){
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
    }};
  }, [socket]);

  return (
    <div>
      <div className="d-flex flex-wrap">
        <h4 className="flex-fill">Messages</h4>
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

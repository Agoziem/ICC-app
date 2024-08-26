import React from "react";
import ProfileimagePlaceholders from "../ImagePlaceholders/ProfileimagePlaceholders";
import "./whatsapp.css";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";

const ContactCard = ({ contact }) => {
  const { setSelectedContact } = useWhatsappAPIContext();
  const {setContactwaID} = useWhatsappAPISocketContext();

  // Get the last received message, if any
  const lastMessage = contact?.recieved_messages?.length
    ? contact.recieved_messages[contact.recieved_messages.length - 1]
    : null;

  // Function to shorten the message body
  const shortenBody = (body, length = 20) => {
    if (!body) return "";
    return body.length > length ? `${body.slice(0, length)}...` : body;
  };

  return (
    <div
      className="ContactCard card p-3 pt-4"
      onClick={() => {
        setSelectedContact(contact)
        setContactwaID(contact.wa_id)
      }}
    >
      <div className="d-flex">
        <ProfileimagePlaceholders firstname={contact.profile_name} />
        <div className="flex-fill ms-3">
          <div className="d-flex justify-content-between">
            <h6>{contact.profile_name}</h6>
            <p className="small mb-1">
              {lastMessage
                ? new Date(lastMessage.timestamp).toLocaleTimeString()
                : ""}
            </p>
          </div>
          <p className="mb-2">
            {shortenBody(lastMessage?.body)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

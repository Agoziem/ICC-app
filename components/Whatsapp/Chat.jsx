import React, { useState } from "react";
import ChatInput from "../Inputs/ChatInput";
import ProfileimagePlaceholders from "../ImagePlaceholders/ProfileimagePlaceholders";
import ChatBody from "./ChatBody";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { BsWhatsapp } from "react-icons/bs";

const Chat = () => {
  const { selectedContact } = useWhatsappAPIContext();
  const [messagetoSend, setMessagetoSend] = useState({
    type: "", // text, image, document
    body: "", // text message
    link: "", // image or document link
    caption: "", // image or document caption
  });

  return (
    <div
      className="rounded ps-0 ps-md-4 mb-4"
      style={{
        minHeight: "100vh",
      }}
    >
      {selectedContact ? (
        <div className="d-flex align-items-center">
          <div className="flex-fill d-flex">
            <ProfileimagePlaceholders firstname="John" />
            <div className="ms-3">
              <h5>{selectedContact.profile_name}</h5>
              <p className="text-primary small my-0">{selectedContact.wa_id}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">
          <div className="mb-2">
            <BsWhatsapp
              style={{
                fontSize: "3.5rem",
                color: "var(--bgDarkerColor)",
              }}
            />
          </div>
          No contact selected
        </div>
      )}

      {/* the message */}
      <ChatBody />

      {/* the reply */}
      <div className="mt-3">
        <ChatInput messagetoSend={messagetoSend} setMessagetoSend={setMessagetoSend} />
      </div>
    </div>
  );
};

export default Chat;

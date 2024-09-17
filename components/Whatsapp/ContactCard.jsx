import React, { useCallback, useEffect, useState } from "react";
import ProfileimagePlaceholders from "../ImagePlaceholders/ProfileimagePlaceholders";
import "./whatsapp.css";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";

const ContactCard = ({ contact }) => {
  const { setSelectedContact } = useWhatsappAPIContext();
  const [numOfUnreadMessages, setNumOfUnreadMessages] = useState(0);
  const { generalSocket,setContactwaID } = useWhatsappAPISocketContext();

  // ------------------------------------------------------
  // update number of unread messages on mount
  // ------------------------------------------------------
  useEffect(() => {
    if (contact.recieved_messages) {
      const unreadMessages = contact.recieved_messages.filter(
        (message) => !message.seen
      );
      setNumOfUnreadMessages(unreadMessages.length);
    }
  }, [contact]);

  // ------------------------------------------------------
  // Function to update the seen status of unread messages
  // ------------------------------------------------------
  const updateSeenStatus = useCallback(() => {
    const unseenMessageIds = contact.recieved_messages
      .filter((message) => !message.seen)
      .map((message) => message.message_id);
    if (unseenMessageIds.length > 0) {
      console.log("Sending update for unseen messages to the Server:",unseenMessageIds);
      try {
        generalSocket.send(
          JSON.stringify({
            action: "update_seen_status",
            wa_id: contact.wa_id,
            message_ids: unseenMessageIds,
          })
        );
      } catch (error) {
        console.error("Failed to send update for seen status:", error);
      }
    }
  }, []);

  // ------------------------------------------------------
  // handle sending the Message to Websocket
  // ------------------------------------------------------
  const sendMessage = () => {
    try {
      if (generalSocket) {
        // Send via contact-specific WebSocket
        updateSeenStatus();
      } else {
        console.error("No WebSocket connection available!");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // ------------------------------------------------------
  // handle contact click
  // ------------------------------------------------------
  const handleContactClick = () => {
    try {
      setSelectedContact(contact);
      setContactwaID(contact.wa_id)
      sendMessage();
    } catch (error) {
      console.error("Error handling contact click:", error);
    }
  };

  // ------------------------------------------------------
  // Get the last received message, if any
  // ------------------------------------------------------
  const lastMessage = contact?.recieved_messages?.length
    ? contact.recieved_messages[contact.recieved_messages.length - 1]
    : null;

  // ------------------------------------------------------
  // Function to shorten the message body
  // ------------------------------------------------------
  const shortenBody = (body, length = 18) => {
    if (!body) return "";
    return body.length > length ? `${body.slice(0, length)}...` : body;
  };

  return (
    <div className="ContactCard card p-3 pt-4" onClick={handleContactClick}>
      <div className="d-flex">
        <ProfileimagePlaceholders firstname={contact.profile_name} />
        <div className="flex-fill ms-3">
          <div className="d-flex justify-content-between">
            <h6>{contact.profile_name}</h6>
            <p
              className={`small ${
                numOfUnreadMessages === 0 ? "text-primary" : "text-secondary"
              } mb-1`}
            >
              {lastMessage
                ? new Date(lastMessage.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-0">{shortenBody(lastMessage?.body)}</div>
            {numOfUnreadMessages > 0 && (
              <span className="badge bg-secondary rounded-pill flex-shrink-0">
                {numOfUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

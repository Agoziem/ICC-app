import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";
import { BsWhatsapp } from "react-icons/bs";
import "./whatsapp.css";
import Scrolltobottom from "./Scrolltobottom";

// {
//   "message": {
//       "id": 19,
//       "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYEjFGOUU2NjdCQUVFRUMxMjVCNQA=",
//       "message_type": "text",
//       "body": "Okay Sir",
//       "media_id": "",
//       "mime_type": "",
//       "timestamp": "2024-08-29T15:23:16.370103Z",
//       "message_mode": "received message",
//       "contact": 15
//   }
// }

const ChatBody = () => {
  const { messages, setMessages, bottomRef, scrollToBottom } =
    useWhatsappAPIContext();
  const { chatsocket } = useWhatsappAPISocketContext();

  // append new message to the messages list
  useEffect(() => {
    if (chatsocket) {
      chatsocket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.message) {
          setMessages((prevMessages) => {
            return [...prevMessages, data.message];
          });
        }
      };
    }
  }, [chatsocket]);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="position-relative">
      <div className="chatbody mt-3 p-4 rounded text-white d-flex flex-column ">
        <div
          className={`${
            messages.length > 0 ? "mt-auto" : "my-auto"
          }`}
        >
          {messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage key={message.message_id} message={message} />
            ))
          ) : (
            <div className="text-center mt-4 px-4">
              <div>
                <BsWhatsapp
                  className="mb-3"
                  style={{
                    fontSize: "4.5rem",
                    color: "var(--bgColor)",
                  }}
                />
              </div>
              No messages found, select a Contact to start messaging, note the
              messaging must be initiated from the contact side
            </div>
          )}
          {/* Dummy element to scroll into view */}
          <div ref={bottomRef} />
        </div>
        <Scrolltobottom />
      </div>
    </div>
  );
};

export default ChatBody;

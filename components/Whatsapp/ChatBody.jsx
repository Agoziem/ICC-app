import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";
import { BsWhatsapp } from "react-icons/bs";

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
  const { messages,setMessages } = useWhatsappAPIContext();
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

  return (
    <div
      className="mt-3 p-4 rounded text-white"
      style={{
        backgroundColor: "var(--bgDarkerColor)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: messages.length > 0 ? "flex-end" : "center",
        overflowY: "auto",
      }}
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
    </div>
  );
};

export default ChatBody;

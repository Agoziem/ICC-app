import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";
import { BsWhatsapp } from "react-icons/bs";


const ChatBody = () => {
  const { messages } = useWhatsappAPIContext();
  const { chatsocket } = useWhatsappAPISocketContext();

  useEffect(() => {
    if (chatsocket) {
      chatsocket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
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

import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { BsWhatsapp } from "react-icons/bs";
import "./whatsapp.css";
import Scrolltobottom from "./Scrolltobottom";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";

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
//        "seen": false,
//       "contact": 15
//   }`
// }

const ChatBody = () => {
  const { chatSocket, contactwaID } = useWhatsappAPISocketContext();
  const {
    messages,
    setMessages,
    bottomRef,
    scrollToBottom,
    setAtthebottom,
  } = useWhatsappAPIContext();

  // ------------------------------------------------------
  // Reference to the chat container for scroll detection
  // ------------------------------------------------------
  const chatContainerRef = useRef(null);


  // ------------------------------------------------------
  // append new message to the messages list
  // -----------------------------------------------------
  useEffect(() => {
    if (chatSocket && contactwaID) {
      chatSocket.onmessage = appendMessage;
    }
    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      if (chatSocket && contactwaID) chatSocket.onmessage = null;
    };
  }, [chatSocket, contactwaID]);

  const appendMessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.message) {
      setMessages((prevMessages) => {
        return [...prevMessages, data.message];
      });
    }
  };

  // ------------------------------------------------------
  // Scroll to the bottom whenever messages change
  // ------------------------------------------------------
  useEffect(() => {
    if (bottomRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  // ------------------------------------------------------
  // Handle scroll event to check if the user has scrolled up
  // ------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;

        // Check if the user is not at the bottom
        if (scrollTop + clientHeight < scrollHeight - 50) {
          // 50px buffer to detect close to bottom
          setAtthebottom(false);
        } else {
          setAtthebottom(true);
        }
      }
    };
    const chatContainer = chatContainerRef.current;
    chatContainer.addEventListener("scroll", handleScroll);
    // Cleanup on component unmount
    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, [setAtthebottom]);

  return (
    <div className="position-relative">
      <div
        ref={chatContainerRef}
        className="chatbody mt-3 p-4 rounded text-white d-flex flex-column "
      >
        <div className={`${messages.length > 0 ? "mt-auto" : "my-auto"}`}>
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

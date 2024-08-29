import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import "./inputs.css";
import { ImAttachment } from "react-icons/im";
import ChatAttachments from "../Whatsapp/ChatAttachments";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";

const ChatInput = ({ messagetoSend, setMessagetoSend }) => {
  const [hastext, setHastext] = useState(false);
  const { sendMessage, sendingMessage, selectedContact } =
    useWhatsappAPIContext();
  const [hasAttachment, setHasAttachment] = useState(false);

  // Handle changes in the input field
  const handleChanges = (e) => {
    if (e.target.value.length > 0) {
      setHastext(true);
    } else {
      setHastext(false);
    }
    setMessagetoSend({ ...messagetoSend, body: e.target.value, type: "text" });
  };

  // Handle the submission of the form
  const handleSubmission = async (e) => {
    e.preventDefault();
    await sendMessage(messagetoSend);
    setMessagetoSend((prevmessages) => {
      return { ...prevmessages, body: "", type: "" };
    });
    setHastext(false);
  };

  return (
    <>
      {selectedContact && (
        <form onSubmit={handleSubmission}>
          <div
            className="d-flex rounded p-2 align-items-center"
            style={{
              backgroundColor: "var(--bgDarkerColor)",
              borderColor: "var(--bgDarkerColor)",
            }}
          >
            <div className="dropup">
              <ImAttachment
                className="dropdown-toggle m-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontSize: "1.3rem",
                  color: "var(--bgColor)",
                  cursor: "pointer",
                }}
              />
              <ChatAttachments />
            </div>

            <input
              type="text"
              className="chatinput form-control"
              placeholder="Type a message"
              value={messagetoSend.body}
              onChange={handleChanges}
              style={{
                backgroundColor: "var(--bgDarkerColor)",
                color: "white",
                borderColor: "var(--bgDarkerColor)",
              }}
            />

            {hastext && (
              <button className="btn btn-sm btn-primary rounded">
                {!sendingMessage ? (
                  <AiOutlineSend
                    className="h6 mb-0"
                    style={{
                      fontSize: "1.3rem",
                    }}
                  />
                ) : (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default ChatInput;

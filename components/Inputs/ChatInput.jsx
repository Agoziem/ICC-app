import React, { useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import "./inputs.css";
import { ImAttachment } from "react-icons/im";
import ChatAttachments from "../Whatsapp/ChatAttachments";
import useSWR from "swr";
import { sendWAMessage, WhatsappAPIendpoint } from "@/data/whatsappAPI/fetcher";
import { WAMessageDefault } from "@/constants";
import { sendWAMessageOptions } from "@/data/whatsappAPI/fetcherOptions";

/**
 * @param {{contact: WAContact}} props
 * @returns {JSX.Element}
 */
const ChatInput = ({ contact }) => {
  const { mutate } = useSWR(
    contact ? `${WhatsappAPIendpoint}/messages/${contact.id}` : null
  );
  const [hasAttachment, setHasAttachment] = useState(false);
  const [messageBody, setMessageBody] = useState(""); // Manage input with useState
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [height, setHeight] = useState(0);
  const textareaRef = useRef(null);

  // handle input Change
  const handleInputChange = (e) => {
    setMessageBody(e.target.value);
    handleTextGrow();
  };

  // handle text grow
  const handleTextGrow = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px"; // Reset height
      const scrollHeight = textarea.scrollHeight; // Get the actual height
      textarea.style.height = `${scrollHeight}px`; // Set the dynamic height
      setHeight(scrollHeight);
    }
  };


  // handlesubmission
  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      return;
    }
    /** @type {WAMessage} */
    const messagetosubmit = {
      ...WAMessageDefault,
      body: messageBody,
      contact: contact.id,
      message_mode: "sent",
    };

    setIsSubmitting(true);
    try {
      setMessageBody(""); // Clear the input field after submitting
      setIsSubmitting(false);
      setHeight(0)
      await mutate(
        sendWAMessage(messagetosubmit),
        sendWAMessageOptions(messagetosubmit)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {contact && (
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
                onClick={() => setHasAttachment(!hasAttachment)}
              />
              {hasAttachment && <ChatAttachments />}
            </div>

            <textarea
              value={messageBody}
              onChange={handleInputChange}
              ref={textareaRef}
              className="chatinput form-control"
              placeholder="Type a message"
              style={{
                backgroundColor: "var(--bgDarkerColor)",
                color: "white",
                borderColor: "var(--bgDarkerColor)",
                overflow: "hidden",
                resize: "none",
                lineHeight: "1.2",
                height: `${height}px`,
              }}
            />

            {/* Conditionally show the submit button if there is text in the input */}
            {messageBody.trim().length > 0 && (
              <button
                className="btn btn-sm btn-primary rounded"
                type="submit"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
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

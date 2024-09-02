import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import React from "react";
// /   {
//   //     "id": 1,
//     "wa_id": "12345",
//     "profile_name": "John Doe",
//     "recieved_messages": [
//         {
//             "id": 1,
//             "message_id": "msg123",
//             "contact": 1,
//             "message_type": "text",
//             "body": "Hello",
//             "media_id": null,
//             "mime_type": null,
//             "timestamp": "2024-08-20T12:34:56Z",
//             "message_mode": "received message"
//         },
//         ...
//     ],
//     "sent_messages": [
//         {
//             "id": 2,
//             "message_id": "msg456",
//             "contact": 1,
//             "message_type": "text",
//             "body": "Hi there!",
//             "link": null,
//             "timestamp": "2024-08-20T12:45:00Z",
//             "message_mode": "sent message",
//             "status": "sent"
//         },
//         ...
//     ]
// }

const ChatMessage = ({ message }) => {
  const { getMedia } = useWhatsappAPIContext();
  const messageTime = new Date(message.timestamp);

  return (
    <div
      className={`d-flex mb-3 ${
        message.message_mode === "sent message"
          ? "justify-content-end"
          : "justify-content-start"
      }`}
    >
      <div
        style={{
          backgroundColor:
            message.message_mode === "sent message"
              ? "var(--secondary)"
              : "var(--bgDarkColor)",
          padding: "10px 15px",
          borderRadius: "20px",
          borderBottomLeftRadius:
            message.message_mode === "sent message" ? "20px" : "0",
          borderBottomRightRadius:
            message.message_mode === "received message" ? "20px" : "0",
          maxWidth: "70%",
          wordWrap: "break-word",
          color:
            message.message_mode === "sent message"
              ? "white"
              : "var(--primary)",
        }}
      >
        {
          // Display the message body if the message type is text
          message.message_type === "text" ? (
            message.body
          ) : (
            <img
              src={getMedia(message.media_id)}
              alt="Media"
              style={{ maxWidth: "100%" }}
            />
          )
        }

        <div className="d-flex justify-content-end">
          <small
            style={{
              color:
                message.message_mode === "sent message"
                  ? "white"
                  : "var(--primary)",
              fontSize: "0.7rem",
            }}
          >
            {messageTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

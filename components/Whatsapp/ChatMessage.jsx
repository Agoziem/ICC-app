import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegFileImage } from "react-icons/fa6";

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
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const { getMedia } = useWhatsappAPIContext();

  useEffect(() => {
    // Fetch media if the message type is media and media_id is available
    if (message.message_type !== "text" && message.media_id) {
      const fetchMedia = async () => {
        setMediaLoading(true);
        const url = await getMedia(message.media_id);
        setMediaUrl(url);
        setMediaLoading(false);
      };

      fetchMedia();
    }
  }, [message.media_id, message.message_type]);

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
          message.message_type === "text" ? message.body : null
        }

        {
          // Show a loading spinner while the media is loading
          mediaLoading && (
            <div className="d-flex justify-content-center mt-2">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
        }

        {
          // Display the media if the message type is media
          message.message_type === "image" && mediaUrl && (
            <div className="mt-2">
              <img
                src={mediaUrl}
                alt="media"
                style={{ maxWidth: "70%", borderRadius: "10px" }}
              />
              {message?.caption}
            </div>
          )
        }

        {
          // Display the media if the message type is media
          message.message_type === "sticker" && mediaUrl && (
            <div className="mt-2">
              <img
                src={mediaUrl}
                alt="media"
                style={{ maxWidth: "70%", borderRadius: "10px" }}
              />
            </div>
          )
        }

        {
          // Display the media if the message type is media
          message.message_type === "video" && mediaUrl && (
            <div className="mt-2">
              <video
                src={mediaUrl}
                controls
                style={{ maxWidth: "70%", borderRadius: "10px" }}
              />
              {message.filename && <h6 className="mt-2">{message.filename}</h6>}
              {message?.caption}
            </div>
          )
        }

        {
          // Display the media if the message type is media
          message.message_type === "audio" && mediaUrl && (
            <div className="mt-2">
              <audio controls>
                <source src={mediaUrl} type="audio/mpeg" />
              </audio>
            </div>
          )
        }

        {
          // Display the media if the message type is media
          message.message_type === "document" && mediaUrl && (
            <div style={{ width:"40vw"}}>
              <div className="mb-2 d-flex">
                <div>
                  <FaRegFileImage
                    style={{
                      fontSize: "1.5rem",
                      marginRight: "5px",
                      color: "var(--primary)",
                    }}
                  />
                </div>
                <div>{message.filename && <h6>{message.filename}</h6>}</div>
              </div>

              <Link
                href={mediaUrl}
                className="btn btn-primary w-100 mb-2"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--primary)" }}
              >download</Link>
              <div>{message?.caption}</div>
            </div>
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

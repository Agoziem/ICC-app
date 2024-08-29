"use client";
import React, { useEffect } from "react";
import ContactCard from "./ContactCard";
import SearchInput from "../Inputs/SearchInput";
import "./whatsapp.css";
import { useWhatsappAPIContext } from "@/data/whatsappAPI/WhatsappContext";
import { MdOutlineContacts } from "react-icons/md";
import { useWhatsappAPISocketContext } from "@/data/whatsappAPI/WhatsappSocketContext";

// {
//   "contact": {
//       "id": 15,
//       "wa_id": "2348080982606",
//       "profile_name": "Engr Gozzy",
//       "recieved_messages": [
//           {
//               "id": 2,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYEkFBQUIzOTIzODQ4M0UxNUM3RgA=",
//               "message_type": "text",
//               "body": "Thanks I love these update",
//               "media_id": "",
//               "mime_type": "",
//               "timestamp": "2024-08-26T21:33:11.299906Z",
//               "message_mode": "received message",
//               "contact": 15
//           },
//           {
//               "id": 3,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYEkZFQzBDOTYxREI3NUE1NEVGNQA=",
//               "message_type": "text",
//               "body": "i will like to have a word with you guys",
//               "media_id": "",
//               "mime_type": "",
//               "timestamp": "2024-08-26T21:34:50.102700Z",
//               "message_mode": "received message",
//               "contact": 15
//           },
//           {
//               "id": 5,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYIDk0NkUxM0Q4QTQwRDkwNjc0ODU1OTg2RjUyMTg5RUFDAA==",
//               "message_type": "text",
//               "body": "Glory be to Jesus",
//               "media_id": "",
//               "mime_type": "",
//               "timestamp": "2024-08-26T21:48:57.498545Z",
//               "message_mode": "received message",
//               "contact": 15
//           },
//           {
//               "id": 6,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYEkU2REYxMTk2N0U1OTc0Rjg1OQA=",
//               "message_type": "text",
//               "body": "Thanks I love these update",
//               "media_id": "",
//               "mime_type": "",
//               "timestamp": "2024-08-26T22:00:08.598629Z",
//               "message_mode": "received message",
//               "contact": 15
//           },
//           {
//               "id": 7,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYEkREMjg2QjczMkExMUYzRDM1OAA=",
//               "message_type": "text",
//               "body": "i really love your Services",
//               "media_id": "",
//               "mime_type": "",
//               "timestamp": "2024-08-26T22:08:32.299345Z",
//               "message_mode": "received message",
//               "contact": 15
//           },
//           {
//               "id": 19,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABIYEjFGOUU2NjdCQUVFRUMxMjVCNQA=",
//               "message_type": "text",
//               "body": "Okay Sir",
//               "media_id": "",
//               "mime_type": "",
//               "timestamp": "2024-08-29T15:23:16.370103Z",
//               "message_mode": "received message",
//               "contact": 15
//           }
//       ],
//       "sent_messages": [
//           {
//               "id": 1,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABEYEkJFREVEN0FDRDI5QjQyNUM4MgA=",
//               "message_type": "text",
//               "body": "Thanks alot for contacting Us",
//               "link": "",
//               "timestamp": "2024-08-27T02:49:13.652649Z",
//               "message_mode": "sent message",
//               "status": "sent",
//               "contact": 15
//           },
//           {
//               "id": 2,
//               "message_id": "wamid.HBgNMjM0ODA4MDk4MjYwNhUCABEYEkM1RjhCQTY5MTgwRDk3N0RBNgA=",
//               "message_type": "text",
//               "body": "we will reach out to you soonest",
//               "link": "",
//               "timestamp": "2024-08-27T02:50:03.808100Z",
//               "message_mode": "sent message",
//               "status": "sent",
//               "contact": 15
//           }
//       ]
//   }
// }
const Contacts = () => {
  const { contacts, setContacts } = useWhatsappAPIContext();
  const { socket } = useWhatsappAPISocketContext();

  // update the contact and fix it at the top of the list if it exist
useEffect(() => {
  if (socket) {
    const handleMessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.contact) {
        setContacts((prevContacts) => {
          const index = prevContacts.findIndex(
            (contact) => contact.id === data.contact.id
          );
          if (index === -1) {
            return [data.contact, ...prevContacts];
          } else {
            console.log("contact exist");
            const updatedContacts = [...prevContacts];
            updatedContacts.splice(index, 1);
            console.log(updatedContacts);
            updatedContacts.unshift(data.contact); 
            return updatedContacts;
          }
        });
      }
    };
    // Attach the handler
    socket.onmessage = handleMessage;
    // Cleanup on component unmount
    return () => {
      socket.onmessage = null;
    };
  }
}, [socket]);

  return (
    <div>
      <div className="d-flex flex-wrap">
        <h4 className="flex-fill">Messages</h4>
        <div className="d-flex bg-primary-light">
          <button className="btn btn-sm btn-primary rounded me-2">
            All messages
          </button>
          <button
            className="btn btn-sm btn-primary rounded"
            style={{
              backgroundColor: "var(--bgDarkerColor)",
              borderColor: "var(--bgDarkerColor)",
            }}
          >
            Unread
          </button>
        </div>
      </div>
      <hr />
      <div className="mb-4">
        <SearchInput />
      </div>
      <div className="Contacts d-flex flex-column g-1 pe-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        ) : (
          <div className="text-center mt-4">
            <div className="mb-2">
              <MdOutlineContacts
                style={{
                  fontSize: "3.5rem",
                  color: "var(--bgDarkerColor)",
                }}
              />
            </div>
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;

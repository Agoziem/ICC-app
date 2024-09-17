"use client";
import Contacts from "./Contacts";
import Chat from "./Chat";

const WhatsappContainer = () => {
  
  return (
    <div className="row mt-1">
      <div className="col-md-4">
        <Contacts />
      </div>
      <div className="col-md-8">
        <Chat />
      </div>
    </div>
  );
};

export default WhatsappContainer;

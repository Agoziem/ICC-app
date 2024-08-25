"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const WhatsappAPISocketContext = createContext();

const WhatsappAPISocketProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  const [socket, setSocket] = useState(null);
  const [contactwaID, setContactwaID] = useState(null);

  useEffect(() => {
    if (contactwaID) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/whatsappapiSocket/${contactwaID}/`);

      ws.onopen = () => {
        console.log("Connected to WebSocket");
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);
      return () => {
        if (ws) ws.close();
      };
    }
  }, [contactwaID]);

  // ------------------------------------------------------
 
  return (
    <WhatsappAPISocketContext.Provider
      value={{
        organizationID,
        setContactwaID,
        socket, // WebSocket connection for onmessage event
      }}
    >
      {children}
    </WhatsappAPISocketContext.Provider>
  );
};

const useWhatsappAPISocketContext = () => {
  return useContext(WhatsappAPISocketContext);
};

export { WhatsappAPISocketProvider, useWhatsappAPISocketContext };

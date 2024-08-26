"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const WhatsappAPISocketContext = createContext();

const WhatsappAPISocketProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  const [
    NEXT_PUBLIC_DJANGO_WEBSOCKET_URL,
    setNEXT_PUBLIC_DJANGO_WEBSOCKET_URL,
  ] = useState(process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL);

  const [chatsocket, setChatSocket] = useState(null);
  const [socket, setSocket] = useState(null);
  const [contactwaID, setContactwaID] = useState(null);

  // ------------------------------------------------------
  // Create a WebSocket connection when contactwaID changes
  // ------------------------------------------------------
  useEffect(() => {
    if (contactwaID) {
      const ws = new WebSocket(
        `${NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}/ws/whatsappapiSocket/${contactwaID}/`
      );

      ws.onopen = () => {
        console.log("Connected to WebSocket");
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setChatSocket(ws);
      return () => {
        if (ws) ws.close();
      };
    }
  }, [contactwaID]);

  // ------------------------------------------------------
  //  connect the general whatsapp websocket on mount
  //  ------------------------------------------------------
  useEffect(() => {
    if (!NEXT_PUBLIC_DJANGO_WEBSOCKET_URL) return;

    const ws = new WebSocket(
      `${NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}/ws/whatsappapiSocket/`
    );

    // Handle WebSocket open event
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    // Handle WebSocket close event
    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      // retry connection after 5 seconds
      setTimeout(() => {
        setSocket(new WebSocket(`${NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}/ws/whatsappapiSocket/`));
      }, 5000);
    };

    // Handle WebSocket error event
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Set the WebSocket connection to the state
    setSocket(ws);

    // Cleanup function to close WebSocket on component unmount
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("Closing WebSocket connection");
        ws.close();
      }
    };
  }, [NEXT_PUBLIC_DJANGO_WEBSOCKET_URL]);

  return (
    <WhatsappAPISocketContext.Provider
      value={{
        organizationID,
        setContactwaID,
        chatsocket, // WebSocket connection for onmessage event on a specific contact
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

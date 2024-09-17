"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

// -----------------------------------------------------------
// Helper function to create a new WebSocket connection
// -----------------------------------------------------------
const createWebSocket = (url, onOpen, onClose, onError) => {
  const ws = new WebSocket(url);

  ws.onopen = onOpen || (() => console.log("Connected to WebSocket:", url));
  ws.onclose =
    onClose ||
    ((event) => console.log("WebSocket closed:", event.code, event.reason));
  ws.onerror = onError || ((error) => console.error("WebSocket error:", error));

  return ws;
};

// ----------------------------------------------------------
// The context itself
// ----------------------------------------------------------
const WhatsappAPISocketContext = createContext(null);

const WhatsappAPISocketProvider = ({ children }) => {
  const [organizationID, setOrganizationID] = useState(
    process.env.NEXT_PUBLIC_ORGANIZATION_ID
  );
  const [generalSocket, setGeneralSocket] = useState(null);
  const [chatSocket, setChatSocket] = useState(null);
  const [contactwaID, setContactwaID] = useState(null);
  const [retryInterval, setRetryInterval] = useState(5000); // Retry interval in case of disconnection

  // ------------------------------------------------------
  // General WebSocket connection (for all contacts/events)
  // ------------------------------------------------------
  const connectGeneralSocket = useCallback(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}/ws/whatsappapiSocket/`;
    const ws = createWebSocket(
      wsUrl,
      () => console.log("Connected to General WebSocket"),
      (event) => {
        console.log("General WebSocket closed:", event.code, event.reason);
        // Reconnect logic with delay
        setTimeout(connectGeneralSocket, retryInterval);
      },
      (error) => console.error("General WebSocket error:", error)
    );

    setGeneralSocket(ws);
  }, [retryInterval]);

  // ------------------------------------------------------
  // Specific WebSocket connection for a contact
  // ------------------------------------------------------
  const connectChatSocket = useCallback((waID) => {
    if (!waID) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}/ws/whatsappapiSocket/${waID}/`;
    const ws = createWebSocket(
      wsUrl,
      () => console.log("Connected to Chat WebSocket for:", waID),
      (event) => {
        console.log("Chat WebSocket closed:", event.code, event.reason);
        // Optional reconnection logic for specific chat
      },
      (error) => console.error("Chat WebSocket error for", waID, ":", error)
    );

    setChatSocket(ws);
  }, []);

  // ------------------------------------------------------
  // Connect to general WebSocket on mount
  // ------------------------------------------------------
  useEffect(() => {
    if (!generalSocket) connectGeneralSocket();
    return () => {
      if (generalSocket) generalSocket.close(); // Cleanup on unmount
    };
  }, [connectGeneralSocket, generalSocket]);

  // ------------------------------------------------------
  // Connect to a specific chat WebSocket when `contactwaID` changes
  // ------------------------------------------------------
  useEffect(() => {
    if (contactwaID) {
      connectChatSocket(contactwaID);
    } else if (chatSocket) {
      chatSocket.close(); // Cleanup previous chat socket if no contact ID is set
    }
  }, [contactwaID]);

  // ------------------------------------------------------
  // Disconnect general and specific WebSockets
  // ------------------------------------------------------
  const disconnectGeneralSocket = () => {
    if (generalSocket) {
      generalSocket.close();
      setGeneralSocket(null);
    }
  };

  const disconnectChatSocket = () => {
    if (chatSocket) {
      chatSocket.close();
      setChatSocket(null);
    }
  };

  return (
    <WhatsappAPISocketContext.Provider
      value={{
        organizationID,
        setOrganizationID,
        contactwaID,
        setContactwaID,
        generalSocket,
        chatSocket,
        connectGeneralSocket,
        connectChatSocket,
        disconnectGeneralSocket,
        disconnectChatSocket,
        setRetryInterval,
      }}
    >
      {children}
    </WhatsappAPISocketContext.Provider>
  );
};

// Hook to access the WebSocket context
const useWhatsappAPISocketContext = () => {
  return useContext(WhatsappAPISocketContext);
};

export { WhatsappAPISocketProvider, useWhatsappAPISocketContext };

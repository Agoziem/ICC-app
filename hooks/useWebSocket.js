"use client";
import { useEffect, useState, useCallback } from "react";

const useWebSocket = ({
  url, // WebSocket URL
  onOpen = () => {}, // Custom callback when the connection opens
  onClose = () => {}, // Custom callback when the connection closes
  onMessage = (e) => {}, // Custom callback when a message is received
  onError = (e) => {}, // Custom callback for error handling
  autoReconnect = true, // Automatically try to reconnect
  reconnectInterval = 5000, // Interval between reconnection attempts
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null); // Store WebSocket object
  const [isConnected, setIsConnected] = useState(false);

  const handleError = (e) => {
    setError(e);
    setLoading(false);
    onError(e);
  };

  // Function to initialize WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (!url) return;

    const wsInstance = new WebSocket(url);
    setWs(wsInstance);
    setLoading(true);

    wsInstance.onopen = () => {
      setIsConnected(true);
      setLoading(false);
      onOpen();
    };

    wsInstance.onclose = () => {
      setIsConnected(false);
      setLoading(false);
      onClose();

      // Handle auto-reconnect logic if enabled
      if (autoReconnect) {
        setTimeout(() => connectWebSocket(), reconnectInterval);
      }
    };

    wsInstance.onmessage = (e) => {
      onMessage(e);
    };

    wsInstance.onerror = (e) => {
      handleError(e);
    };
  }, [url, autoReconnect, reconnectInterval, onOpen, onClose, onMessage, onError]);

  // Effect to initialize the WebSocket connection when the URL changes
  useEffect(() => {
    if (url) {
      connectWebSocket();
    }

    return () => {
      // Clean up WebSocket on component unmount
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url, connectWebSocket]);

  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  }, [ws]);

  // Close WebSocket connection
  const closeWebSocket = useCallback(() => {
    if (ws) {
      ws.close();
    }
  }, [ws]);

  return {
    isConnected,
    error,
    loading,
    sendMessage,
    closeWebSocket,
  };
};

export default useWebSocket;



// import useWebSocket from "@/hooks/useWebSocket";

// const WebSocketComponent = () => {
//   const { isConnected, sendMessage, error, closeWebSocket } = useWebSocket({
//     url: `ws://example.com/ws/room/1/`,
//     onOpen: () => console.log("Connected"),
//     onMessage: (e) => console.log("Received message:", e.data),
//     onClose: () => console.log("Disconnected"),
//     onError: (e) => console.error("WebSocket error", e),
//     autoReconnect: true,
//     reconnectInterval: 5000,
//   });

//   return (
//     <div>
//       {isConnected ? <p>Connected</p> : <p>Disconnected</p>}
//       <button onClick={() => sendMessage({ type: "ping" })}>Send Ping</button>
//       {error && <p>Error: {error.message}</p>}
//       <button onClick={closeWebSocket}>Close WebSocket</button>
//     </div>
//   );
// };

// export default WebSocketComponent;

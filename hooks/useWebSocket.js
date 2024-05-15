"use client";
import { useEffect, useState } from "react";

const useWebSocket = ({
  roomprefix,
  room_name,
  Connect,
  Disconnect,
  Receive,
}) => {
  const Django_websocket_URL = process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wsobject, setWsObject] = useState(null);

  // connect to Websocket
  useEffect(() => {
    if (room_name) {
      const ws = new WebSocket(
        `${Django_websocket_URL}/ws/${roomprefix}/${room_name}/`
      );
      setWsObject(ws);

      ws.onopen = () => {
        Connect();
      };

      ws.onclose = () => {
        Disconnect();
      };

      ws.onmessage = (e) => {
        Receive(e);
      };

      ws.onerror = (e) => {
        handleError(e);
      };
    }

    return () => {
      if (wsobject && wsobject.readyState === WebSocket.OPEN) {
        wsobject.close();
      }
    };
  }, [room_name]);

  const handleError = (e) => {
    setError(e);
    setLoading(false);
  };

  // send message with Websocket
  const sendMessage = (message) => {
    setLoading(true);
    if (wsobject && wsobject.readyState === WebSocket.OPEN) {
      wsobject.send(JSON.stringify(message));
    }
    setLoading(false);
  };

  // close Websocket
  const closeWebSocket = () => {
    if (wsobject) {
      wsobject.close();
    }
  };

  return {
    error,
    loading,
    sendMessage,
    closeWebSocket,
  };
};

export default useWebSocket;

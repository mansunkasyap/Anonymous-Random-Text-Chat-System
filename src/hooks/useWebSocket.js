// src/hooks/useWebSocket.js
import { useEffect, useState } from "react";
import { connectSocket, sendMessage } from "../services/socketService";
import { STATUS, WS_URL } from "../utils/constants";

export const useWebSocket = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [messages, setMessages] = useState([]);
  let hasConnected = false;
  useEffect(() => {
    const ws = connectSocket(WS_URL);

    let hasConnected = false;

    ws.onopen = () => {
      console.log("Connected");
      hasConnected = true;
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "searching":
          setStatus(STATUS.SEARCHING);
          break;

        case "matched":
          setStatus(STATUS.CONNECTED);
          setMessages([]);
          break;

        case "message":
          setMessages((prev) => [
            ...prev,
            {
              text: data.message,
              sender: data.sender
            }
          ]);
          break;
        case "chat-ended":
          setStatus(STATUS.IDLE);
          setMessages([]);
          break;
        case "partner-disconnected":
          setStatus(STATUS.DISCONNECTED);
          break;

        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log("Socket closed");

      // ✅ Only mark disconnected if it was previously connected
      if (hasConnected) {
        setStatus(STATUS.DISCONNECTED);
      }
    };

    return () => ws.close();
  }, []);

  return {
    status,
    messages,
    send: sendMessage,
    setMessages
  };
};
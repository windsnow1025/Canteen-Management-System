import { useState, useEffect, useRef, useCallback } from 'react';

const useWebSocket = (relativePath) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    const url = getWebSocketUrl(relativePath);

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up on unmount
    return () => {
      ws.current.close();
    };
  }, [relativePath]);

  const getWebSocketUrl = (relativePath) => {
    const protocolPrefix = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    return `${protocolPrefix}${host}${relativePath}`;
  };

  // Function to send messages
  const sendMessage = useCallback(
    (message) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(message));
      }
    },
    []
  );

  return { messages, sendMessage, connected };
};

export default useWebSocket;
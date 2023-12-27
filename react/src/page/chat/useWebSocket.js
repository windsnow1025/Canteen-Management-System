import { useState, useEffect, useRef, useCallback } from 'react';

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    let fullURL;
    if (url.includes('ws')) {
      fullURL = url;
    } else {
      fullURL = getWebSocketUrl(url);
    }

    ws.current = new WebSocket(fullURL);

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
  }, [url]);

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
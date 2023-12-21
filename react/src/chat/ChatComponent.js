import React, { useState } from 'react';
import useWebSocket from './useWebSocket';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, connected } = useWebSocket('ws://www.windsnow1025.com:8082/chatroom');

  const handleSend = () => {
    const message = {
      sender: 'master', // TODO: Replace with actual sender
      receiver: 'admin', // TODO: Replace with actual receiver
      content: input
    };
    sendMessage(message);
    setInput('');
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        {connected ? 'Connected' : 'Disconnected'}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend} disabled={!connected}>
        Send
      </button>
      <div>
        <h3>Messages</h3>
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
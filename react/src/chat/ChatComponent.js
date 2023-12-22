import React, {useEffect, useState} from 'react';
import useWebSocket from './useWebSocket';
import NavBar from "../components/NavBar";
import UserApi from "../api/UserApi";
const ChatComponent = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, connected } = useWebSocket('ws://www.windsnow1025.com:8082/chatroom');
  const [userName, setUserName] = useState('');
  const handleSend = () => {
    const message = {
      sender: userName, // TODO: Replace with actual sender
      receiver: 'admin', // TODO: Replace with actual receiver
      content: input
    };
    sendMessage(message);
    setInput('');
  };

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userInfo = await UserApi.getUserInfo();
                setUserName(userInfo.username);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserName();
    }, []);

  return (
      <>
          <NavBar/>
          <div className="flex items-center justify-center h-screen bg-gray-200">
              <div className="p-8 bg-white rounded shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">WebSocket Chat</h2>
                  <div className="mb-4">
        <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${connected ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'}`}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
                  </div>
                  <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full p-2 mb-4 border rounded shadow-inner"
                  />
                  <button onClick={handleSend} disabled={!connected}
                          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                      Send
                  </button>
                  <div className="mt-8 overflow-y-auto max-h-60">
                      <h3 className="text-xl font-semibold mb-2">Messages</h3>
                      {messages.map((message, index) => (
                          <div
                              key={index}
                              className={`p-2 mb-2 bg-gray-100 rounded shadow-inner ${message.sender === userName ? 'text-right' : 'text-left'}`}
                          >
                              {message.sender === userName ? '我' : message.sender}：{message.content}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </>
  );
};

export default ChatComponent;
const WebSocket = require('ws');

// Replace with the appropriate WebSocket server URL
const WEBSOCKET_URL = 'ws://www.windsnow1025.com:8082/chatroom';

// Create a WebSocket client instance
const ws = new WebSocket(WEBSOCKET_URL);

// Event listener for when the connection is open
ws.on('open', function open() {
  console.log('Connected to the server.');
  // Send a message to the server
  ws.send(JSON.stringify({
    sender: 's',
    receiver: 'r',
    content: 'c'
  }));
});

// Event listener for when a message is received from the server
ws.on('message', function message(data) {
  const message = JSON.parse(data);
  console.log('Received message from the server:', message);
});

// Event listener for when the connection is closed
ws.on('close', function close() {
  console.log('Disconnected from the server.');
});

// Event listener for handling errors
ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
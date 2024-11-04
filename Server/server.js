const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });
let reactClient = null;
let esp32Client = null;

server.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'register' && data.device === 'esp32') {
      esp32Client = ws;
      console.log('ESP32 connected');

    } else if (data.type === 'register' && data.device === 'react') {
      reactClient = ws;
      console.log('React Native app connected');
    }

    if (data.type === 'alert' && reactClient) {
      reactClient.send(JSON.stringify({ type: 'esp32-alert' }));
    }

    if (data.type === 'reset' && esp32Client) {
      esp32Client.send(JSON.stringify({ type: 'reset' }));
    }
  });

  ws.on('close', () => {
    if (ws === esp32Client) esp32Client = null;
    if (ws === reactClient) reactClient = null;
  });
});

console.log('WebSocket server running on ws://localhost:3000');

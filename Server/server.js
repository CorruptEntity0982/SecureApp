const WebSocket = require('ws');
const axios = require('axios');
const server = new WebSocket.Server({ port: 3000 });

let reactClient = null;
let esp32Client = null;

server.on('connection', (ws, req) => {
  ws.on('message', async (message) => {
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
      try {
        const response = await axios.put('http://127.0.0.1:8000/sendMail');
        console.log('Email sent successfully:', response.data);
      } catch (error) {
        console.error('Failed to send email:', error.response?.data || error.message);
      }
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

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        if (message === 'alert triggered') {
            ws.send('User input required: Type "ok" to acknowledge');
        }
    });
    process.stdin.on('data', (data) => {
        const userInput = data.toString().trim();
        if (userInput === 'ok') {
            ws.send('Acknowledged. Stopping alert display.');
        }
    });
});

console.log('WebSocket server is running on ws://localhost:8000');

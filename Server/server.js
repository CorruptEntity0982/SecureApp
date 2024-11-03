const express = require('express');
const WebSocket = require('ws');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = 3000;
const app = express();
const wss = new WebSocket.Server({ noServer: true });
let reactNativeClient = null;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,     
        pass: process.env.EMAIL_PASS  
    }
});

function sendAlertEmail(locationLink) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.ALERT_EMAIL,
        subject: 'Alert Triggered',
        text: `An alert has been triggered. Check the location: ${locationLink}`
    };
    return transporter.sendMail(mailOptions);
}

wss.on('connection', (ws, req) => {
    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        if (data.type === 'esp32-alert') {
            console.log('Alert received from ESP32');
            if (reactNativeClient) {
                reactNativeClient.send(JSON.stringify({ type: 'alert', message: 'Alert Triggered' }));
                const locationLink = `https://www.google.com/maps?q=${data.lat},${data.lng}`;
                await sendAlertEmail(locationLink);
                
                console.log(`Email sent with location: ${locationLink}`);
            }
        }
        if (data.type === 'close-alert') {
            console.log('Alert closed by user on React Native app');
            ws.send(JSON.stringify({ type: 'reset' }));
        }
    });
    if (req.url.includes('/react-native')) {
        reactNativeClient = ws;
        console.log('React Native client connected');
    }
});

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

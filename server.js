const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      // Broadcast message to all clients
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'chat',
            content: data.content,
            sender: data.sender,
            timestamp: data.timestamp
          }));
        }
      });

      // Send acknowledgment back to sender
      ws.send(JSON.stringify({
        type: 'chat',
        content: 'Message received',
        sender: 'system',
        timestamp: new Date()
      }));
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
}); 
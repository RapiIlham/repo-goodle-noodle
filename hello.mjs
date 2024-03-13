const express = require('express');
const { Server } = require('ws');

const app = express();
const server = app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log(ws.upgradeReq.url);

  ws.on('message', (data) => {
    console.log(`Received message: ${data}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

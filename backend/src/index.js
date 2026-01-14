
import { WebSocketServer } from 'ws';

import { GameManager } from './GameManager.js';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', (ws) => {
  console.log("New Client Connected");
  gameManager.addUser(ws);
  ws.on('close', () => {
    gameManager.removeUser(ws);
  })
})

console.log(`Web Socket Server is running on port ${8080}`);

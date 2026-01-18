// signaling-server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });
const rooms = {};

wss.on("connection", ws => {
  ws.on("message", msg => {
    let data = JSON.parse(msg);
    if (data.joinCode) {
      rooms[data.joinCode] = rooms[data.joinCode] || [];
      rooms[data.joinCode].push(ws);
      // let peers in same room receive messages
      rooms[data.joinCode].forEach(peer => {
        if (peer !== ws) peer.send(msg);
      });
    }
  });
});

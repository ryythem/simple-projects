import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

interface User {
  socket: WebSocket;
  room: String;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      const currentRoomUsers = allSockets.find(
        (x) => x.socket === socket
      )?.room;
      for (let i = 0; i < allSockets.length; i++) {
        if (currentRoomUsers === allSockets[i].room) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});

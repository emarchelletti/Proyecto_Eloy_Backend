// Configuración de WEBSOCKETS para chat 
import { Server } from "socket.io";

const configureSocketIO = (httpServer) => {
  const io = new Server(httpServer);
  let messages = [];

  io.on("connection", (socket) => {
    // Mensajes chat
    socket.on("message", (data) => {
      messages.push(data);
      io.emit("messageLogs", messages);
    });
    // User chat
    socket.on("auth", (username) => {
      socket.emit("messageLogs", messages);
      socket.broadcast.emit("userConnected", username);
    });
  });
};

export default configureSocketIO;

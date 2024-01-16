// Configuración de WEBSOCKETS para chat y /realtimeproducts
import { Server } from "socket.io";
import productManager from "../dao/managers/productManager.js";

const configureSocketIO = (httpServer) => {
  const io = new Server(httpServer);
  let messages = [];

  io.on("connection", (socket) => {
    const manager = new productManager("./src/dao/data/products.json");
    console.log("Cliente conectado a través de WebSocket");
    // Ingreso de nuevo producto
    socket.on("newProduct", (data) => {
      manager.addProduct(data);
      io.emit("updateProducts", data);
    });
    // Boton 'Eliminar producto'
    socket.on("deleteProduct", (data) => {
      console.log(data);
    });
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

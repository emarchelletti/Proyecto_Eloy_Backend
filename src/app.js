import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { createServer } from 'http';
import { Server } from "socket.io";
import mongoose from "mongoose";

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import { viewsRouter, homeRouter, realTimeProducts, chatRouter } from './routes/views.router.js';
import userRouter from './routes/user.router.js';

const app = express();
const port = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer);
let messages = [];

io.on('connection', (socket) => {
  console.log('Cliente conectado a través de WebSocket');
  // Boton 'Eliminar producto'
  socket.on('deleteProduct', (data) => {
    console.log(data);
  })
  // Mensajes chat
  socket.on('message', (data) => {
    messages.push(data);
    io.emit('messageLogs', messages)
  });
  // User chat
  socket.on("auth", (username) => {
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("userConnected", username);
  }); 
});

// HANDLEBARS
app.engine('handlebars', handlebars.engine()); // Se establece Handlebars como el motor de plantillas.
app.set('views', `${__dirname}/views`); // Se indica el directorio donde se encuentran las plantillas.
app.set('view engine', 'handlebars'); //Se establece el motor de vista como 'handlebars'.

// MIDDLEWARES
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como datos JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.static(__dirname + '/public')); // Configurar Express para servir archivos estáticos desde la carpeta "public"

// Usar los routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/home', homeRouter);
app.use('/realtimeproducts', realTimeProducts);
app.use('/chat', chatRouter);
app.use("/api/users", userRouter);



httpServer.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

export { app, io };

const uri = 'mongodb+srv://emarchelletti:nA4hiZ8xvtvX40B7@cluster0.dwxwl2n.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(uri, {})
  .then((res) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });




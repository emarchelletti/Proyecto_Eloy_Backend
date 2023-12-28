import express from "express";
import handlebars from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import 'dotenv/config';
import __dirname from "./utils.js";
// Routes FS (fuera de uso por el momento)
//import productRouterFs from './routes/productRouterFs.js';   PRODUCT ROUTER CON FS
//import cartRouter from './routes/cartRouterFs.js'; CART ROUTER CON FS

// Routes Views
import {
  indexRouter,
  homeRouter,
  realTimeProducts,
  chatRouter,
  productsViewRouter,
  cartViewRouter,
  loginRouter,
  profileRouter,
  registerRouter,
} from "./routes/views/views.router.js";
import userRouter from "./routes/views/user.router.js";
import messageRouter from "./routes/views/messages.router.js";

// Routes API
import productRouter from "./routes/api/product.router.js";
import cartRouter from "./routes/api/cart.router.js";
import sessionsApiRouter from './routes/api/sessions.router.js';


const app = express();
const port = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);
let messages = [];

//  WEBSOCKETS
io.on("connection", (socket) => {
  console.log("Cliente conectado a través de WebSocket");
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

// HANDLEBARS
app.engine("handlebars", handlebars.engine()); // Se establece Handlebars como el motor de plantillas.
app.set("views", `${__dirname}/views`); // Se indica el directorio donde se encuentran las plantillas.
app.set("view engine", "handlebars"); //Se establece el motor de vista como 'handlebars'.

// MIDDLEWARES
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como datos JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.static(__dirname + "/public")); // Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(cookieParser());

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.mongo, {})
  .then((res) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Configuración de middleware para manejar sesiones usando connect-mongo
app.use(session({
    secret: "CoderSecret", // Clave secreta para firmar las cookies de sesión
    resave: false, // Evitar que se guarde la sesión en cada solicitud
    saveUninitialized: true, // Guardar la sesión incluso si no se ha modificado
    store: MongoStore.create({
      mongoUrl: process.env.mongo,
      ttl: 2 * 60, // Tiempo de vida de la sesión en segundos (2 minutos en este caso)
    }),
  })
);

// Api Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use('/api/sessions', sessionsApiRouter);

// Views Routes
app.use("/",indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/logout', sessionsApiRouter);
app.use("/carts", cartViewRouter);
app.use("/products", productsViewRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/home", homeRouter);
app.use("/chat", chatRouter);
app.use("/messages", messageRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

httpServer.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

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
import passport from "passport";
import initializePassport from './config/passport.config.js';

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

// Routes API
import productRouter from "./routes/api/product.router.js";
import cartRouter from "./routes/api/cart.router.js";
import sessionsRouter from './routes/api/sessions.router.js';


const app = express();
const port = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);
let messages = [];

// Configuración de WEBSOCKETS
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

// Configuración de Handlebars
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
  .connect(process.env.MONGO_URL, {})
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
      mongoUrl: process.env.MONGO_URL,
      ttl: 2 * 60, // Tiempo de vida de la sesión en segundos (2 minutos en este caso)
    }),
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// Api Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
// app.use("/api/users", userRouter); ---- Pendiente de hacer
app.use('/api/sessions', sessionsRouter);

// Views Routes
app.use("/",indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use("/carts", cartViewRouter);
app.use("/products", productsViewRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/home", homeRouter);
app.use("/chat", chatRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

httpServer.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

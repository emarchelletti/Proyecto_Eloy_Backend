import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import {__dirname} from "./utils/utils.js";
import initializePassport from "./config/passport.config.js";
import configureSocketIO from "./config/socketio.config.js";
import configureRoutes from "./routes/routes.js";
import config from "./config/server.config.js";
import { db, mongoStoreOptions } from "./config/db.config.js";

// Server configuration
const app = express();
const port = config.port;
let httpServer = "";

if (port) {
  httpServer = app.listen(port, () => {
    console.log(
      `Servidor iniciado en http://localhost:${port} en modo ${config.mode}`
    );
  });
} else {
  console.error("No hay variables de entorno configuradas");
}

// Configuración de WEBSOCKETS para chat y /realtimeproducts
configureSocketIO(httpServer);

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine()); // Se establece Handlebars como el motor de plantillas.
app.set("views", `${__dirname}/views`); // Se indica el directorio donde se encuentran las plantillas.
app.set("view engine", "handlebars"); //Se establece el motor de vista como 'handlebars'.

// MIDDLEWARES
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como datos JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.static(__dirname + "/public")); // Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(cookieParser());
app.use(cors({origin:'http://localhost:8080/', methods:['GET','POST','PUT']}));

// Configuración de middleware para manejar sesiones usando connect-mongo
app.use(session(mongoStoreOptions));

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configuración de rutas
configureRoutes(app);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

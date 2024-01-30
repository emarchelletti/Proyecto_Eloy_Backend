import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import config from "../config/server.config.js";

mongoose.connect(config.url, {});

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error de conexión a la base de datos:")
);
db.once("open", () => {
  console.log("Conectado a la base de datos");
});

export const mongoStoreOptions = {
  secret: process.env.SESSION_SECRET, // Clave secreta para firmar las cookies de sesión
  resave: false, // Evitar que se guarde la sesión en cada solicitud
  saveUninitialized: true, // Guardar la sesión incluso si no se ha modificado
  store: MongoStore.create({
    mongoUrl: config.url,
    ttl: 15 * 60, // Tiempo de vida de la sesión en segundos (5 minutos en este caso)
  }),
};

export { mongoose, db };

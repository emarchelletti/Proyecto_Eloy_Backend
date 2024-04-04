import mongoose from "mongoose";
import MongoStore from "connect-mongo";

mongoose.connect(process.env.MONGO_URL, {});

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error de conexión a la base de datos:")
);
db.once("open", () => {
  console.log("Conectado a la base de datos");
});

// CONFIGURACION DE LA SESSION
export const mongoStoreOptions = {
  secret: process.env.SESSION_SECRET, // Clave secreta para firmar las cookies de sesión
  resave: false, // Evitar que se guarde la sesión en cada solicitud
  saveUninitialized: true, // Guardar la sesión incluso si no se ha modificado
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 15 * 60, // Tiempo de vida de la sesión en segundos (15 minutos en este caso)
  }),
};

export { mongoose, db };

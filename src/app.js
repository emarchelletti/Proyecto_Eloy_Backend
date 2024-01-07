import express from "express";
import {__dirname} from "./utils.js";
import { db } from "./config/db.config.js";
import handlebars from "express-handlebars";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js"
import { passportCall } from "./utils.js";

//Server configuration
const app = express();
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

//Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.static(__dirname + "/public")); // Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Views engine
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/current", passportCall("jwt"), (req, res) => {
  res.send(req.user);
});

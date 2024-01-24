import express from "express";
import {showAllUsers, registerUserWithPassport} from "../../controllers/users.controller.js";
import passport from "passport";


const router = express.Router();

// Mostrar todos los usuarios en la base de datos
router.get("/", showAllUsers);

// Registro con passport
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  registerUserWithPassport
);

export default router;

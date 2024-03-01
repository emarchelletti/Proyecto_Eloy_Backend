import express from "express";
import passport from "passport";
import * as sessionsController from '../../controllers/sessions.controller.js';

const router = express.Router();

// Mostrar sesion activa
router.get("/", sessionsController.showActiveSessions);

//Login con Passport
router.post(
  "/login",
  passport.authenticate("login",{ failureRedirect: "/api/sessions/faillogin" }),
  sessionsController.loginUserWithPassport
);
router.get("/faillogin", function (req, res) {
  let message = 'Usuario o contraseña incorrectos, revise la consola para mas detalles';
  res.status(409).json(message);
});

//Login con GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/profile");
  }
);

router.post("/logout", sessionsController.destroySession);

export default router;

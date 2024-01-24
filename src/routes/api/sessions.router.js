import express from "express";
import passport from "passport";
import * as sessionsController from '../../controllers/sessions.controller.js';



const router = express.Router();

// Mostrar sesion activa
router.get("/", sessionsController.showActiveSessions);

//Login con Passport
router.post(
  "/login",
  passport.authenticate("login",{ failureRedirect: "/faillogin" }),
  sessionsController.loginUserWithPassport
);

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

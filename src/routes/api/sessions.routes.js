import express from "express";
import passport from "passport";
import {
  loginUserWithPassport,
  logOutUser,
  showActiveSessions,
} from "../../controllers/users.controller.js";


const router = express.Router();

// Mostrar sesion activa
router.get("/", showActiveSessions);
//Login con Passport
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  loginUserWithPassport
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
router.post("/logout", logOutUser);

export default router;

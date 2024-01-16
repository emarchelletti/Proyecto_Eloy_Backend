import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../../controllers/authController.js";
import passport from "passport";

const router = express.Router();

//router.post("/register", registerUser);
//router.post("/login", loginUser);
router.post("/logout", logOutUser);

router.get("/", async (req, res) => {
  let activeSession = req.session;
  res.json(activeSession);
  console.log(`Se realizo una consulta a la base de datos de "Sessions"`);
});

// Login con passport
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    let user = req.user;
    if (!user)
      return res
        .status(400)
        .send({ status: "Error", error: "Invalid Credentials" });
    delete user.password;
    req.session.user = user;
    res.redirect("/profile");
  }
);
// Regsitro con passport
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    let user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect("/profile");
  }
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

export default router;

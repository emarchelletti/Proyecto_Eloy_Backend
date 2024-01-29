import express from "express";
import * as userController from "../../controllers/users.controller.js";
import passport from "passport";

const router = express.Router();

// Rutas para administrar los usuarios (desde Postman)
router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

// Registro con passport
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/api/users/failregister" }),
  userController.registerUserWithPassport
);
router.get("/failregister", function (req, res) {
  let message = "Ya existe un usuario con ese mail"
  res.status(409).json(message);
});


export default router;

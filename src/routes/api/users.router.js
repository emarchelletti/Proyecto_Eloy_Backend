import express from "express";
import {uploader} from '../../middlewares/uploader.middleware.js';
import * as userController from "../../controllers/users.controller.js";
import * as passwordController from "../../controllers/password.controller.js";
import passport from "passport";
import { isUserOrPremium } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Rutas para administrar los usuarios (desde Postman)
router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.put("/premium/:userId", userController.upgradeUser);
router.post('/:userId/documents', uploader.any(), userController.uploadDocument);


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

//Password reset
router.post("/passwordreset", passwordController.resetPassword);

export default router;

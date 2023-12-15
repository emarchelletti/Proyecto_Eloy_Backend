import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../../dao/controllers/authController.js";
import { showProfile } from "../../dao/controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/", logOutUser);
router.post("/profile", showProfile);

export default router;

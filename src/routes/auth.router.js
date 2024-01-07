import { Router } from "express";
import { generateToken, createHash, isValidPassword } from "../utils.js";
import userModel from "../models/user.models.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  if (!first_name || !last_name || !age || !email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Uno o varios datos incompletos" });

  const findUser = await userModel.findOne({ email });
  let result;
  if (findUser) {
    return res.status(400).send({
      status: "error",
      error: "Intenta hacer login con usuario y contraseña",
    });
  } else {
    result = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password: createHash(password),
    });
  }
  console.log("Se registro un usuario");
  res.send({ status: "success" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne(
      { email },
      { email: 1, password: 1 }
    );

    if (!user)
      return res.status(401).send({
        status: "Error",
        error: "No hay usuario registrado con ese mail",
      });

    if (!isValidPassword(user, password))
      return res.status(401).send({
        status: "Error",
        error: "Contraseña incorrecta",
      });

    delete user.password;

    let token = generateToken(user);
    res
      .cookie("access_token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "Login Success" });
      console.log('Se logueo un usuario');
  } catch (error) {
    console.log("Error, credenciales invalidas", error);
    res.redirect("/error");
  }
});

export default router;

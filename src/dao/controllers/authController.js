import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";


// Registra a un nuevo usuario.
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password)
      return res
        .status(401)
        .send({ status: "Error", error: "Incomplete values" });

    const user = new userModel({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    });
    await user.save();
    delete user.password;

    console.log('Se registro un nuevo usuario');
    req.session.user = user;
    res.redirect("/profile");
  } catch (error) {
    console.log("Error en el registro de nuevo usuario");
  }
};

// Autentica a un usuario y almacena la información en la sesión.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne(
      { email },
    );

    if (!user)
      return res.status(401).send({
        status: "Error",
        error: "No existe usuario con ese mail",
      });

    if (!isValidPassword(user, password))
      return res.status(401).send({
        status: "Error",
        error: "Usuario y/o contraseña incorrecta 2",
      });

    delete user.password;
    console.log('Se logueo un usuario')
    req.session.user = user;
    res.redirect("/profile");
  } catch (error) {
    console.log("Error, credenciales invalidas", error);
    res.redirect("/error");
  }
};

//Cierra la sesión del usuario.
export const logOutUser = async (req, res) => {
  try {
    // Verifica si el usuario está autenticado antes de cerrar la sesión
    if (req.session.user) {
      delete req.session.user;
      // Opcionalmente, puedes destruir completamente la sesión
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al cerrar la sesión", err);
          res.status(500).send("Error al cerrar la sesión");
        } else {
          console.log('Se cerro la sesion del usuario');
          res.redirect("/login");
        }
      });
    } else {
      console.log('No cerro la sesion');
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};

import userModel from "../models/user.model.js";

// Registra a un nuevo usuario.
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const user = new userModel({ first_name, last_name, email, age, password });
    await user.save();
    req.session.name = name;
    req.session.email = email;
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

// Autentica a un usuario y almacena la información en la sesión.
export const loginUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const user = await userModel.findOne({first_name, email, password});
    if (user) {
      req.session.first_name = user.first_name;
      req.session.email = user.email;
      res.redirect("/profile");
    } else {
      res.redirect("/");
    }
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
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};

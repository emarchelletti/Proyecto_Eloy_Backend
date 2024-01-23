import { findUser } from "../dao/managers/userManager.js";

// Muestra todos los usuarios en la base de datos
export const showAllUsers = async (req, res) => {
  let users = await findUser;
  res.json(users);
  console.log(`Se realizo una consulta a la base de datos de "Usuarios"`);
};

// Muestra las sesiones activas
export const showActiveSessions = async (req, res) => {
  let activeSession = req.session;
  res.json(activeSession);
  console.log(`Se realizo una consulta a la base de datos de "Sessions"`);
}

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
          console.log("Se cerro la sesion del usuario");
          res.redirect("/login");
        }
      });
    } else {
      console.log("No cerro la sesion");
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};

// Registra a un nuevo usuario con Passport
export const registerUserWithPassport = async (req, res) => {
  let user = req.user;
  delete user.password;
  req.session.user = user;
  res.redirect("/profile");
};

// Autentica a un usuario y almacena la información en la sesión con Passport
export const loginUserWithPassport = async (req, res) => {
  let user = req.user;
  if (!user)
    return res
      .status(400)
      .send({ status: "Error", error: "Invalid Credentials" });
  delete user.password;
  req.session.user = user;
  res.redirect("/profile");
};

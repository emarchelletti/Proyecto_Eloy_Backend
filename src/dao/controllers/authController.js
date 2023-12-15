import userModel from "../models/user.model.js";

// Registra a un nuevo usuario.
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const user = new userModel({
      first_name,
      last_name,
      email,
      age,
      password,
      role,
    });

    await user.save();

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

// Autentica a un usuario y almacena la información en la sesión.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    let role = 'user';
    // Verifica si el usuario que se registra es el administrador
    if (user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") {
      role = "admin";
    }

    if (user) {
      req.session.first_name = user.first_name;
      req.session.last_name = user.last_name;
      req.session.email = user.email;
      req.session.age = user.age;
      req.session.role = role
      res.redirect("/products");
    } else {
      console.log("usuario o contraseña incorrectos");
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
    // Verifica si la sesión existe antes de cerrarla
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al cerrar la sesión", err);
          res.status(500).send("Error al cerrar la sesión");
        } else {
          console.log("Sesión cerrada correctamente");
          res.redirect("/");
        }
      });
    } else {
      console.log("No hay sesión activa");
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};

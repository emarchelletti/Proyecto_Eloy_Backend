import userModel from "../models/user.model.js";

// Devuelve todos los usuarios en la db
export const getUser = userModel.find();

// Registra a un nuevo usuario en la db
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password)
      return res
        .status(401)
        .send({ status: "Error", error: "Incomplete values" });

    // Verificar si el correo electrónico es "admin@coder.com"
    const isAdmin = email.toLowerCase() === "admin@coder.com";

    const user = new userModel({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      role: isAdmin ? "admin" : "user",
    });

    await user.save();
    delete user.password;

    console.log("Se registro un nuevo usuario");
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
    const user = await userModel.findOne({ email });

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
    console.log("Se logueo un usuario");
    req.session.user = user;
    res.redirect("/profile");
  } catch (error) {
    console.log("Error, credenciales invalidas", error);
    res.redirect("/error");
  }
};



// POR EL MOMENTO ESTAS FUNCIONES NO SE ESTAN UTILIZANDO PORQUE LAS MANEJO CON PASSPORT COMO MIDDLEWARE EN "users.router.js"
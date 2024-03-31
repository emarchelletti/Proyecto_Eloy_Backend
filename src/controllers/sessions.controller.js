import * as sessionsService from "../dao/services/sessions.service.js";
import usersService from "../dao/services/users.service.js";

// Muestra las sesiones activas
export const showActiveSessions = async (req, res) => {
  let activeSession = req.session;
  res.json(activeSession);
};

//Cierra la sesión del usuario.
export const destroySession = (req, res) => {
  try {
    sessionsService.destroySession(req);
    let message = "Sesión cerrada exitosamente";
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Autentica a un usuario y almacena la información en la sesión con Passport
export const loginUserWithPassport = async (req, res) => {
  try {
    const user = req.user;

    // Guardar la fecha y hora actual en la propiedad last_connection
    user.last_connection = new Date();

    // Actualizar el usuario en la base de datos
    const updatedUser = await usersService.updateUser(user._id, user);

    // Guardar el usuario en la sesión
    req.session.user = updatedUser;

    console.log(`El usuario "${updatedUser.email}" ha iniciado sesión`);

    // Redirigir al perfil del usuario
    res.redirect('/profile');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

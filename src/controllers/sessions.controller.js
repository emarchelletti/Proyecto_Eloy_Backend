import * as sessionsService from '../dao/services/sessions.service.js';



// Muestra las sesiones activas
export const showActiveSessions = async (req, res) => {
    let activeSession = req.session;
    res.json(activeSession);
  }
  
  //Cierra la sesión del usuario.
  export const destroySession = (req, res) => {
    try {
      sessionsService.destroySession(req);
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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
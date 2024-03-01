import jwt from "jsonwebtoken";
import userModel from "../dao/models/user.model.js";
import {createHash} from "../utils/utils.js";

export const resetPassword = async (req, res) => {
    const { password, token } = req.body;
  try {
    // Verificar si el token es válido y decodificarlo para obtener el correo electrónico
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decodedToken;

    // Buscar al usuario en la base de datos utilizando el correo electrónico
    const user = await userModel.findOne({ email });

    // Si no se encuentra el usuario, devolver un error
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar la contraseña del usuario
    user.password = createHash(password);
    await user.save();

    // Eliminar el token de restablecimiento de la base de datos
    user.resetPassToken = "";
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

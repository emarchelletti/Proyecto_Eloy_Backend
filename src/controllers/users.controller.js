import usersService from "../dao/services/users.service.js";
import { createHash, checkRequiredDocuments } from "..//utils/utils.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Agregar un nuevo usuario
export const addUser = async (req, res) => {
  const isAdmin = req.body.email.toLowerCase() === "admin@coder.com";
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    age: req.body.age,
    password: createHash(req.body.password),
    role: isAdmin ? "admin" : "user",
  };
  try {
    const newUser = await usersService.addUser(userData);
    console.log("Se agrego un usuario");
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updatedUserData = req.body;
  try {
    const updatedUser = await usersService.updateUser(userId, updatedUserData);
    console.log("Se actualizo un usuario");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await usersService.deleteUser(userId);
    console.log("Se elimino un usuario");
    const message = `Se eliminó el usuario con el ID: ${userId}`;
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Registrar a un nuevo usuario con Passport
export const registerUserWithPassport = async (req, res) => {
  console.log("Se ha registrado un nuevo usuario con Passport");
  res.redirect("/login");
};
// Hacer premium a un usuario
export const upgradeUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Obtener los documentos del usuario
    const userDocuments = await usersService.getUserDocuments(userId);
    // Verificar si el usuario ha cargado todos los documentos requeridos
    const hasRequiredDocuments = checkRequiredDocuments(userDocuments);

    if (hasRequiredDocuments) {
      // Actualizar el rol del usuario a 'premium'
      const premiumRole = { role: 'premium' };
      const updatedUser = await usersService.updateUser(userId, premiumRole);

      console.log("El usuario fue actualizado a Premium");
      res.status(200).json(updatedUser);
    } else {
      // Si el usuario no ha cargado todos los documentos requeridos, devolver un error
      res.status(400).json({ error: "El usuario debe cargar todos los documentos requeridos para actualizar a premium." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Cargar un documento a un usuario
export const uploadDocument = async (req, res) => {
  const { userId } = req.params;
  try {
    const documents = req.files; 
    const documentInfo = documents.map(file => ({
      name: file.filename,
      reference: file.path,
    }));
    const updatedUser = await usersService.addDocumentsToUser(userId, documentInfo);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

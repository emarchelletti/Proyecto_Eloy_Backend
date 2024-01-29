import usersService from "../dao/services/users.service.js";

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
  const userData = req.body;
  try {
    const newUser = await usersService.addUser(userData);
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
    console.log('Se elimino un usuario de la base de datos');
    const message = `Se eliminó el usuario con el ID: ${userId}`;
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar a un nuevo usuario con Passport
export const registerUserWithPassport = async (req, res) => {
  res.redirect("/login");
};



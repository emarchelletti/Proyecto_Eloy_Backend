import userModel from "../models/user.model.js";

const usersService = {

  getAllUsers: async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error('Error al obtener todos los usuarios');
    }
  },

  addUser: async (userData) => {
    try {
      const newUser = new userModel(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error al agregar un nuevo usuario');
    }
  },

  updateUser: async (userId, updatedUserData) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
        throw new Error('Usuario no encontrado');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Error al actualizar el usuario');
    }
  },

  deleteUser: async (userId) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error('Usuario no encontrado');
      }
      return deletedUser;
    } catch (error) {
      throw new Error('Error al eliminar el usuario');
    }
  },
};

export default usersService;




// POR EL MOMENTO ESTAS FUNCIONES NO SE ESTAN UTILIZANDO PORQUE LAS MANEJO CON PASSPORT COMO MIDDLEWARE EN "users.router.js"
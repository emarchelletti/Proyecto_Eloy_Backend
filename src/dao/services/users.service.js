import userModel from "../models/user.model.js";

const usersService = {
  getAllUsers: async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error("Error al obtener todos los usuarios");
    }
  },

  addUser: async (userData) => {
    try {
      let user = await userModel.findOne({ email: userData.email });
      if (user) {
        console.log(
          "Se intentó registrar un usuario con un correo electrónico que ya existe"
        );
        throw new Error("El correo electrónico ya está registrado");
      }
      const newUser = new userModel(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error.message === "El correo electrónico ya está registrado") {
        throw error;
      } else {
        throw new Error("Error al agregar un nuevo usuario");
      }
    }
  },

  updateUser: async (userId, updatedUserData) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Usuario no encontrado");
      }
      return updatedUser;
    } catch (error) {
      throw new Error("Error al actualizar el usuario");
    }
  },

  deleteUser: async (userId) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("Usuario no encontrado");
      }
      return deletedUser;
    } catch (error) {
      throw new Error("Error al eliminar el usuario");
    }
  },

  addDocumentsToUser: async (userId, documentInfo) => {
    try {
      // Buscar al usuario por su ID
      const user = await userModel.findById(userId);
      console.log(documentInfo);
      // Verificar si el usuario existe
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Iterar sobre cada documento en el array documentInfoArray
      documentInfo.forEach(document => {
      // Agregar el nuevo documento al array 'documents'
      user.documents.push(document);
    });

      // Guardar los cambios en la base de datos
      await user.save();

      return user;
    } catch (error) {
      throw new Error("Error al agregar documento al usuario");
    }
  },

  getUserDocuments: async (userId) => {
    try {
      const user = await userModel.findById(userId);
      return user.documents;
    } catch (error) {
      throw new Error("Error al obtener los documentos del usuario");
    }
  }  
};

export default usersService;

import cartModel from "../models/cart.model.js";

const cartService = {
  getAllCarts: async () => {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los carritos: ${error.message}`);
    }
  },

  getCartById: async (cartId) => {
    try {
      return await cartModel.findById(cartId).populate('products.product').lean();
    } catch (error) {
      throw new Error(`Error al obtener el carrito: ${error.message}`);
    }
  },

  createCart: async (userId) => {
    try {
      const newCart = await cartModel.create({ user: userId });
      return newCart;
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  },

  updateCart: async (cartId, cartData) => {
    try {
      return await cartModel.findByIdAndUpdate(cartId, cartData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el carrito: ${error.message}`);
    }
  },

  removeCart: async (cartId) => {
    try {
      return await cartModel.findByIdAndDelete(cartId);
    } catch (error) {
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  },

  addProductToCart: async (cartId, productId, quantity) => {
    try {
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
    const existingProductIndex = cart.products.findIndex(product => String(product.product) === String(productId));
  
      if (existingProductIndex !== -1 ) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId});
      }
  
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  },

  removeProductFromCart: async (cartId, productId) => {
    try {
      const cart = await cartModel.findById(cartId);
      cart.products = cart.products.filter(
        (item) => !item.product.equals(productId)
      );
      return await cart.save();
    } catch (error) {
      throw new Error(`Error al quitar producto del carrito: ${error.message}`);
    }
  },

  updateProductQuantityInCart: async (cartId, productId, quantity) => {
    try {
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex((item) =>
        item.product.equals(productId)
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
      }

      return await cart.save();
    } catch (error) {
      throw new Error(
        `Error al actualizar la cantidad del producto en el carrito: ${error.message}`
      );
    }
  },

};

export default cartService;

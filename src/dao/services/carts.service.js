import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { generateTicket } from "../services/ticket.service.js";

const   cartService = {
  getAllCarts: async () => {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los carritos: ${error.message}`);
    }
  },

  getCartById: async (cartId) => {
    try {
      return await cartModel
        .findById(cartId)
        .populate("products.product")
        .lean();
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
        throw new Error("Carrito no encontrado");
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => String(product.product) === String(productId)
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId });
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

  processPurchase: async (cartId, userEmail) => {
    try {
      const cart = await cartModel
        .findById(cartId)
        .populate("products.product");

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Verificar el stock antes de procesar la compra
      if (!Array.isArray(cart.products)) {
        throw new Error("El carrito no contiene productos válidos");
      }
      for (const _id of cart.products) {
        const product = await productModel.findById(_id.product);

        if (!product) {
          throw new Error(`Producto con ID ${_id.product} no encontrado`);
        }

        if (product.stock < _id.quantity) {
          throw new Error(
            `Stock insuficiente para el producto ${product.title}`
          );
        }
        // Restar la cantidad comprada del stock del producto
        product.stock -= _id.quantity;
        await product.save();
      }

      //Asigno el mail del usuario logueado
      const purchaser = userEmail; 

      //Calculo la cantidad de $ total del carrito
      const calculateTotalAmount = (cart) => {
        if (!Array.isArray(cart.products)) {
          return 0;
        }

        return cart.products.reduce((total, item) => {
          const productTotal = item.product.price * item.quantity;
          return total + productTotal;
        }, 0);
      };
      const amount = calculateTotalAmount(cart);

      // Generar el ticket después de la compra
      const ticket = await generateTicket(purchaser, amount);

      // Limpiar el carrito después de la compra
      // await cartModel.findByIdAndUpdate(cartId, { $set: { products: [] } });

      return { success: true, ticket };
    } catch (error) {
      throw new Error(`Error al procesar la compra: ${error.message}`);
    }
  },
};

export default cartService;

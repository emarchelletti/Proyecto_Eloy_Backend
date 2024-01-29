// cartService.js
import cartModel from "../models/cart.model.js";

export const getCartByUserId = async (userId) => {
  const cart = await cartModel.findOne({ userId }).populate("products.product");
  return cart;
};

export const addToCart = async (userId, productId, quantity) => {
  const cart = await cartModel
    .findOneAndUpdate(
      { userId },
      { $push: { products: { product: productId, quantity } } },
      { new: true, upsert: true }
    )
    .populate("products.product");
  return cart;
};

export const removeFromCart = async (userId, productId) => {
  const cart = await cartModel
    .findOneAndUpdate(
      { userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    )
    .populate("products.product");
  return cart;
};

export const clearCart = async (userId) => {
  const cart = await cartModel
    .findOneAndUpdate({ userId }, { $set: { products: [] } }, { new: true })
    .populate("products.product");
  return cart;
};

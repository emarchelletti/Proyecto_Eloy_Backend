import * as cartService from '../dao/services/carts.service.js';

export const showCart = async (req, res) => {
  const userId = req.session.user.id; 
  try {
    const cart = await cartService.getCartByUserId(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const userId = req.user._id; 
  const { productId, quantity } = req.body;
  try {
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user._id; 
  const productId = req.params.productId;
  try {
    const cart = await cartService.removeFromCart(userId, productId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user._id; 
  try {
    const cart = await cartService.clearCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

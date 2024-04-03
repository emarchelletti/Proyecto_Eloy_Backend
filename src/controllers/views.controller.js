import * as productService from "../dao/services/products.service.js";
import cartService from "../dao/services/carts.service.js";

export const showProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 8; // Cantidad de productos por página

  try {
    let cartId;
    if (req.session && req.session.user && req.session.user.cart) {
      cartId = req.session.user.cart;
    }
    const productsData = await productService.showProducts(page, limit);
    productsData.cartId = cartId;
    const userData = req.session.user;
    res.render("products", { products: productsData.products, userData, cartId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const homeShowProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 8;

  try {
    const productsData = await productService.showProducts(page, limit);
    res.render("home", productsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const productDetailView = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProductById(productId);
    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const showCart = async (req, res) => {
  try {
    const cartId = req.session.user.cart;
    const cart = await cartService.getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.render("cart", { cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

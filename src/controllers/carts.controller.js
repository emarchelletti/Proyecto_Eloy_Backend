import cartService from "../dao/services/carts.service.js";
import * as productService from "../dao/services/products.service.js";

export const getAll = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await cartService.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const { userId } = req.body; // aca tiene que usar el id de la session
  try {
    const newCart = await cartService.createCart(userId);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const { cartId } = req.params;
  const cartData = req.body;
  try {
    const updatedCart = await cartService.updateCart(cartId, cartData);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  const { cartId } = req.params;
  try {
    await cartService.removeCart(cartId);
    res.json({ message: "Carrito eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProdToCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const user = req.session.user;
  const { quantity } = req.body; // aca tendria que agregar un contador al view de products para mandar la cantidad x el body
  try {
    const product = await productService.getProductById(productId);
    if (user.role === "premium" && product.owner === user.email) {
      return res.status(403).json({ error: "No puedes agregar tu propio producto al carrito" });
    }
    const updatedCart = await cartService.addProductToCart(
      cartId,
      productId,
      quantity
    );
    console.log("Se agrego un producto al carrito");
    res.redirect("/products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMockProdToCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body; // aca tendria que agregar un contador al view de products para mandar la cantidad x el body
  try {
    const updatedCart = await cartService.addProductToCart(
      cartId,
      productId,
      quantity,
      
    );
    console.log("Se agrego un producto al carrito 'addMockProdToCart'");
    res.status(200).json({message: "Se agrego un producto al carrito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeProdToCart = async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const updatedCart = await cartService.removeProductFromCart(
      cartId,
      productId
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProdQuantityToCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCart = await cartService.updateProductQuantityInCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart);
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

export const processPurchase = async (req, res) => {
  const { cartId } = req.params;
  const userEmail = req.session.user.email;
  try {
    const result = await cartService.processPurchase(cartId, userEmail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

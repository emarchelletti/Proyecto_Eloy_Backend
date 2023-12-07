import express from "express";
import Cart from "../daos/models/cart.model.js";

const router = express.Router();

router.use(express.json());

// Ruta raíz POST /api/carts "CREAR UN CARRITO VACIO"
router.post("/", async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    console.log("Se agregó un nuevo carrito");
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// Ruta GET /api/carts/:cid "TRAER TODOS LOS PRODUCTOS DEL CARRITO"
router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId).populate("products.product");

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid "AGREGAR UN PROUCTO AL CARRITO"
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    // Buscar el carrito por su ID
    const cart = await Cart.findById(cartId);

    // Verificar si el carrito existe
    if (cart) {
      // Comprobar si el producto ya está en el carrito
      const existingProduct = cart.products.find((product) =>
        product.product.equals(productId)
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        existingProduct.quantity += 1;
      } else {
        // Si el producto no está en el carrito, agregarlo
        cart.products.push({ product: productId, quantity: 1 });
      }

      // Guardar los cambios en el carrito
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
});

// DELETE /api/carts/:cid/products/:pid "ELIMINAR DEL CARRITO EL PRODUCTO SELECCIONADO"
router.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );
  
    if (!updatedCart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
  
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

// PUT /api/carts/:cid "ACTUALIZAR EL CARRITO CON UN ARRAY DE PRODUCTOS"
router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const newProducts = req.body.products;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Actualiza los productos del carrito con el nuevo arreglo
    cart.products = newProducts;

    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito con los nuevos productos' });
  }
});

// PUT /api/carts/:cid/products/:pid "ACTUALIZAR LA CANTIDAD DE UN PRODUCTO ESPECIFICO"
router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body; 

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productToUpdate = cart.products.find(product => product.product.toString() === productId);
    
    if (!productToUpdate) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    // Actualiza la cantidad del producto
    productToUpdate.quantity = quantity;

    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// DELETE /api/carts/:cid "ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO"
router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar los productos del carrito" });
  }
});

export default router;

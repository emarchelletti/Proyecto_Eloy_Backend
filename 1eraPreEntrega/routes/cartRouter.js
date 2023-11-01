import express from 'express';
import fs from 'fs';

const cartRouter = express.Router();
const cartFile = '../data/cart.json';

cartRouter.use(express.json());

// Ruta raíz POST /api/carts
cartRouter.post('/', async (req, res) => {
  try {
    const newCart = {
      id: Math.floor(Math.random() * 1000).toString(), // Generar un id único
      products: []
    };
    await fs.writeFile(cartFile, JSON.stringify(newCart, null, 2), 'utf-8');
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta GET /api/carts/:cid
cartRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cartData = await fs.readFile(cartFile, 'utf-8');
    const cart = JSON.parse(cartData);
    if (cart.id === cartId) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
cartRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity);

  try {
    const cartData = await fs.readFile(cartFile, 'utf-8');
    const cart = JSON.parse(cartData);

    if (cart.id === cartId) {
      const existingProduct = cart.products.find(product => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }

      await fs.writeFile(cartFile, JSON.stringify(cart, null, 2), 'utf-8');
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

module.exports = cartRouter;

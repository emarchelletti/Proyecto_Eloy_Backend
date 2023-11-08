import express from 'express';
import { promises as fs } from 'fs';


const cartRouter = express.Router();
const cartFile = './data/cart.json';
const productFile = './data/products.json';

cartRouter.use(express.json());

// Ruta raíz POST /api/carts
cartRouter.post('/', async (req, res) => {
  try {
    let carts = [];

    try {
      const cartData = await fs.readFile(cartFile, 'utf-8');
      carts = JSON.parse(cartData);
    } catch (readError) {
    }

    // Determinar el próximo ID disponible
    const maxId = carts.reduce((max, cart) => (parseInt(cart.id) > max ? parseInt(cart.id) : max), 0);
    const newCartId = maxId + 1;

    const newCart = {
      id: newCartId,
      products: []
    };

    carts.push(newCart);

    await fs.writeFile(cartFile, JSON.stringify(carts, null, 2), 'utf-8');
    console.log('Se agregó un nuevo carrito');
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});



// Ruta GET /api/carts/:cid
cartRouter.get('/:cid', async (req, res) => {
  const cartId = parseInt(req.params.cid);

  try {
    const cartData = await fs.readFile(cartFile, 'utf-8');
    const carts = JSON.parse(cartData);

    const cart = carts.find(cart => cart.id === cartId);

    if (cart) {
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
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  try {
    const cartData = await fs.readFile(cartFile, 'utf-8');
    let carts = JSON.parse(cartData);

    const cart = carts.find(cart => cart.id === cartId);

    if (cart) {
      const productData = await fs.readFile(productFile, 'utf-8');
      const products = JSON.parse(productData);
      const product = products.find(product => product.id === productId);
      console.log(product);
      if (product) {
        const existingProduct = cart.products.find(p => p.id === productId);

        if (existingProduct) {
          existingProduct.quantity += 1; 
        } else {
          cart.products.push({ id: productId, quantity: 1 }); 
        }

        await fs.writeFile(cartFile, JSON.stringify(carts, null, 2), 'utf-8');
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});



export default cartRouter;
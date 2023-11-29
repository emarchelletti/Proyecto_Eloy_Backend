import express from 'express';
import Cart from '../dao/models/cart.model.js';
import Product from '../dao/models/product.model.js';


const router = express.Router();

router.use(express.json());

// Ruta raíz POST /api/carts
router.post('/', async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    console.log('Se agregó un nuevo carrito');
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await Cart.findById(cartId);

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
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
  
    try {
      const cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);
  
      if (cart && product) {
        const existingProductIndex = cart.products.findIndex(p => p.id === productId);
  
        if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, aumenta la cantidad
          cart.products[existingProductIndex].cantidad += 1;
        } else {
          // Si el producto no está en el carrito, agrégalo
          cart.products.push({
            producto: product.nombre,
            cantidad: 1,
            precio: product.precio,
          });
        }
  
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Carrito o producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  });

export default router;




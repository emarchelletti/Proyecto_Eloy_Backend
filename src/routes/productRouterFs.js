import express from 'express';
import productManager from '../dao/productManager.js';

const router = express.Router();
const manager = new productManager('./src/data/products.json');

// Ruta raíz GET /api/products
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await manager.getProducts();

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await manager.getProductById(productId);

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta POST /api/products
router.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const product = await manager.addProduct(newProduct);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  try {
    await manager.updateProduct(productId, updatedProduct);
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Ruta DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    await manager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
import * as productService from '../dao/services/products.service.js';

export const getAllProducts = async (req, res) => {
  const { limit, page, sort, query, available } = req.query;
  try {
    const result = await productService.getAllProducts({ limit, page, sort, query, available }); 
    console.log(req.session.user); 
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const newProductData = req.body;
  try {
    const newProduct = await productService.createProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await productService.updateProduct(productId, updatedProductData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const showProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Cantidad de productos por página
  
    try {
      const productsData = await productService.showProducts(page, limit);
  
      res.render('products', productsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
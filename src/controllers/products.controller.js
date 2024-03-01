import * as productService from "../dao/services/products.service.js";

export const getAllProducts = async (req, res) => {
  const { limit, page, sort, query, available } = req.query;
  try {
    const result = await productService.getAllProducts({
      limit,
      page,
      sort,
      query,
      available,
    });
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
    if (req.user.role === "premium") {
      newProductData.owner = req.user.email;
      console.log("Se creo un producto con usuario Premium");
    }
    const newProduct = await productService.createProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body;
  const user = req.session.user;

  try {
    const product = await productService.getProductById(productId);
    let updatedProduct;

    if (user.role === "premium") {
      // Verificar si el usuario premium es el propietario del producto
      if (product.owner === user.email) {
        updatedProduct = await productService.updateProduct(productId, updatedProductData);
        return res.status(200).json({ message: "Producto actualizado con éxito" });
      } else {
        return res.status(403).json({ error: "No tienes permiso para actualizar este producto" });
      }
    } else {
      updatedProduct = await productService.updateProduct(productId, updatedProductData);
    }

    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const user = req.session.user;
  try {
    const product = await productService.getProductById(productId);
    if (user.role === "premium") {
      // Verificar si el usuario premium es el propietario del producto
      if (product.owner === user.email) {
        await productService.deleteProduct(productId);
        res.status(200).json({ message: "Producto eliminado con éxito" });
      } else {
        res
          .status(403)
          .json({ error: "No tienes permiso para eliminar este producto" });
      }
    } else {
      await productService.deleteProduct(productId);
      res.status(200).json({ message: "Producto eliminado con éxito" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const showProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Cantidad de productos por página

  try {
    let cartId;
    if (req.session && req.session.user && req.session.user.cart) {
      cartId = req.session.user.cart;
    }
    const productsData = await productService.showProducts(page, limit);
    productsData.cartId = cartId;

    res.render("products", productsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

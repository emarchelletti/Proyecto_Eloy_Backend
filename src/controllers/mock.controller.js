import { generateMockProducts } from "..//utils/utils.js";
import { createProduct } from "../dao/services/products.service.js";
import { customizeError } from "../middlewares/error.middleware.js";


export const getMockProducts = async (req, res) => {
  const { numOfProducts = 100 } = req.query;
  try {
    const products = [];
    for (let i = 0; i < numOfProducts; i++) {
      products.push(generateMockProducts());
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMockProduct = async (req, res) => {
  const newProductData = req.body;
  const products = [];
  try {
    const newProduct = await createProduct(newProductData);
    products.push(newProduct);
    res.status(201).json(products);
  } catch (error) {
    const customError = customizeError(newProductData);
    console.error(customError);
    res.status(500).json(customError);
  }
};

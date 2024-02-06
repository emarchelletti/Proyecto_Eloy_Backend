import { generateMockProducts } from "../utils.js";

export const getMockProducts = async (req, res) => {
  const { numOfProducts = 100 } = req.query;
  try {
    const products = [];
    for (let i = 0; i < numOfProducts; i++) {
      products.push(generateMockProducts());
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

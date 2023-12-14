import express from "express";
import Product from "../../dao/models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query, available } = req.query;
  const queryOptions = {};

  if (query) {
    queryOptions.category = { $regex: query, $options: "i" };
  }

  if (available) {
    queryOptions.visible = available;
  }

  try {
    const totalCount = await Product.countDocuments(queryOptions); //es la cantidad total de productos que coinciden con los criterios de búsqueda. Se obtiene utilizando Product.countDocuments() con las opciones de búsqueda.
    let totalPages = Math.ceil(totalCount / limit); //se calcula dividiendo totalCount entre el límite (limit) de productos por página, redondeando hacia arriba con Math.ceil(). Esto determina cuántas páginas habrá en total.

    const result = {
      status: "success",
      payload: null,
      totalPages,
      prevPage: null,
      nextPage: null,
      page: parseInt(page),
      hasPrevPage: false,
      hasNextPage: false,
      prevLink: null,
      nextLink: null,
    };

    if (page < totalPages) {
      result.hasNextPage = true;
      result.nextPage = parseInt(page) + 1;
      result.nextLink = `/products?limit=${limit}&page=${
        result.nextPage
      }&sort=${sort || ""}&query=${query || ""}`;
    }

    if (page > 1) {
      result.hasPrevPage = true;
      result.prevPage = parseInt(page) - 1;
      result.prevLink = `/products?limit=${limit}&page=${
        result.prevPage
      }&sort=${sort || ""}&query=${query || ""}`;
    }

    let products;
    if (sort === "asc") {
      products = await Product.find(queryOptions)
        .sort({ price: 1 })
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (page - 1));
    } else if (sort === "desc") {
      products = await Product.find(queryOptions)
        .sort({ price: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (page - 1));
    } else {
      products = await Product.find(queryOptions)
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (page - 1));
    }

    result.payload = products;
    res.json(result);
    console.log(`Se realizo una consulta a la base de datos de "Products"`);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
    console.log(`Se agrego el producto ${newProduct.title}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un producto por ID
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
    console.log(`Se actualizo el producto ${product.title}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un producto por ID
router.delete("/:id", async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

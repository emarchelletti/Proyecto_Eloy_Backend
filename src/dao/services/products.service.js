import productModel from "../models/product.model.js";

export const getAllProducts = async ({
  limit = 10,
  page = 1,
  sort,
  query,
  available,
}) => {
  const queryOptions = {};

  if (query) {
    queryOptions.category = { $regex: query, $options: "i" };
  }

  if (available) {
    queryOptions.visible = available;
  }

  try {
    const totalCount = await productModel.countDocuments(queryOptions);
    const totalPages = Math.ceil(totalCount / limit);

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
      result.nextLink = `/api/products?limit=${limit}&page=${
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
      products = await productModel
        .find(queryOptions)
        .sort({ price: 1 })
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (page - 1));
    } else if (sort === "desc") {
      products = await productModel
        .find(queryOptions)
        .sort({ price: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (page - 1));
    } else {
      products = await productModel
        .find(queryOptions)
        .limit(parseInt(limit))
        .skip(parseInt(limit) * (page - 1));
    }

    result.payload = products;
    return result;
  } catch (error) {
    throw new Error("Error al obtener todos los productos");
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await productModel.findById(productId).lean();
    return product;
  } catch (error) {
    throw new Error("Error al obtener el producto");
  }
};

export const createProduct = async (newProductData) => {
  try {
    const newProduct = new productModel(newProductData);
    await newProduct.save();
    console.log(`El usuario ${newProduct.owner} agrego un nuevo producto: ${newProduct.title}`);
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (productId, updatedProductData) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
    console.log(`Se actualizo el producto: ${updatedProduct.title}`);
    return updatedProduct;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};

export const showProducts = async (page, limit) => {
  try {
    const result = await productModel.paginate({}, { page, limit, lean: true });
    return {
      products: result.docs,
      totalPages: result.totalPages,
      currentPage: result.page,
    };
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

// Manejo de errores desde la respuesta de mongoose
export const customizeErrorMongo = (error) => {
  if (error.message === "ValidationError: title: Path `title` is required.") {
    const message = "No se ingreso el nombre del producto";
    return { message };
  }
  if (error.message === "ValidationError: price: Path `price` is required.") {
    const message = "No se ingreso el precio del producto";
    return { message };
  }
  return { type: "UnexpectedError", message: error.message };
};

// Manejo de errores desde la prueba en /api/mockingProducts
export const customizeError = (newProduct) => {
  if (!newProduct.title)
    return { message: "No se ingreso el nombre del producto" };

  if (!newProduct.price)
    return { message: "No se ingreso el precio del producto" };

  if (typeof newProduct.title !== "string")
    return { message: "Ingrese un valor string para el nombre" };

    if (typeof newProduct.price !== "number")
    return { message: "Ingrese un valor numerico para el precio" };
};

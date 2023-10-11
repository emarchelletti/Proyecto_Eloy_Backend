class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    const codeExists = this.products.some(product => product.code === code);
    if (codeExists) {
      console.log("El código del producto ya existe");
    }

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.nextId,
    };

    this.products.push(product);
    this.nextId++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productById = this.products.find(product => product.id === id);
    if (productById) {
      return productById
    } else {
      console.log('El producto con ese Id no existe')
    }
  }
}

//✓	Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager();
//✓	Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(manager.getProducts());
//✓	Se llamará al método “addProduct” y el objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
manager.addProduct("Producto de Prueba 1", "Este es un producto prueba", 100, "Sin Imagen", "abc123", 25);
//✓	Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(manager.getProducts());
//✓	Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manager.addProduct("Producto de Prueba 1", "Este es un producto prueba", 100, "Sin Imagen", "abc123", 25);
//✓	Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(manager.getProductById(3))
console.log(manager.getProductById(1))


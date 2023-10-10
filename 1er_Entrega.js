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
      throw new Error("El código del producto ya existe");
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
    const productById = this.products.map(product => product.id === id);
    if (productById) {
     return productById
    } else {
      throw new Error ('El producto con ese Id no existe')
    }
  }
}

const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción del Producto 1", 100, "imagen1.jpg", "P001", 10);
manager.addProduct("Producto 2", "Descripción del Producto 2", 200, "imagen2.jpg", "P002", 20);

const products = manager.getProducts();


console.log(products)
manager.getProductById(2)
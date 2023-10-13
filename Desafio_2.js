const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(product) {
    const id = this.nextId++;
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    console.log('Se agrego un nuevo producto');
    return newProduct;
  }

  getProducts() {
    console.log('Se muestra listado de productos');
    return this.products;
  }

  getProductById(id) {
    const productById = this.products.find(product => product.id === id);
    if (productById) {
      console.log('Resultado de la busqueda por Id');
      return productById;
    } else {
      console.log('El producto con ese Id no existe');
    }
  }

  updateProduct(id, updatedProduct) {
    let productFound = false;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = { id, ...updatedProduct };
        productFound = true;
        break;
      }
    }

    if (productFound) {
      this.saveProducts();
      console.log('El producto con ese Id fue actualizado');
    } else {
      console.log('El producto con ese Id no existe');
    }
  }

  deleteProduct(id) {
    let productFound = false;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
        productFound = true;
        break;
      }
    }

    if (productFound) {
      this.saveProducts();
      console.log('El producto con ese Id fue eliminado');
    } else {
      console.log('El producto con ese Id no existe y no se puede elminar');
    }
  }
}


// Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager('products.json');

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(manager.getProducts());

// Se llamará al método “addProduct” 
manager.addProduct({
  title: 'Producto de prueba 1',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
});

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(manager.getProducts());

//✓	Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
console.log(manager.getProductById(1))
console.log(manager.getProductById(2))

// 	Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
manager.updateProduct(1, {
  title: 'Producto de prueba Actualizado',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'nueva_imagen1.jpg',
  code: 'abc123',
  stock: 50
});
console.log(manager.getProducts());

//	Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
manager.deleteProduct(1);
console.log(manager.getProducts());
manager.deleteProduct(1);

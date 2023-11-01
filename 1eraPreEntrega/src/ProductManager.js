import { promises as fs } from 'fs';

export class productManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      // Determinar el próximo ID disponible
      const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
      this.nextId = maxId + 1;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar productos:', error);
    }
  }


  async addProduct(product) {
    const id = this.nextId++;
    const newProduct = { id, ...product };
    this.products.push(newProduct);

    try {
      await this.saveProducts();
      console.log('Se agregó un nuevo producto');
      return newProduct;
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }



  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      console.log('Se muestra listado de productos');
      return this.products;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }

  async getProductById(id) {
    const productById = this.products.find(product => product.id === id);
    if (productById) {
      console.log('Resultado de la búsqueda por Id');
      return productById;
    } else {
      console.log('El producto con ese Id no existe');
      return null; // Devolvemos null para indicar que el producto no se encontró
    }
  }

  async updateProduct(id, updatedProduct) {
    let productFound = false;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = { id, ...updatedProduct };
        productFound = true;
        break;
      }
    }

    if (productFound) {
      try {
        await this.saveProducts();
        console.log('El producto con ese Id fue actualizado');
      } catch (error) {
        console.error('Error al actualizar producto:', error);
      }
    } else {
      console.log('El producto con ese Id no existe');
    }
  }

  async deleteProduct(id) {
    let productFound = false;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
        productFound = true;
        break;
      }
    }

    if (productFound) {
      try {
        await this.saveProducts();
        console.log('El producto con ese Id fue eliminado');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    } else {
      console.log('El producto con ese Id no existe y no se puede eliminar');
    }
  }
}




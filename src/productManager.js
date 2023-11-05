import { promises as fs } from 'fs';

class productManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);

      // Determinar el próximo ID disponible
      const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
      this.nextId = maxId + 1;
      console.log('El proximo producto que se agregue tendra el id: ' + this.nextId);
      
      if (this.products.length > 0) {
        console.log(`Hay ${this.products.length} productos cargados en la App`);
      } else {
        console.log('No hay productos cargados');
      }
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
    const { title, description, code, price, stock, category } = product;


    const existingProduct = this.products.find(p => p.code === code);
    if (existingProduct) {
      throw new Error('El producto con este código ya existe');
    }
    //Todos los campos son obligatorios, a excepción de thumbnails
    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error('Todos los campos son obligatorios');
    }

    const id = this.nextId++;
    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status: true, // Valor por defecto
      stock,
      category,
      thumbnails: product.thumbnails || []
    }

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
      console.error('Error al obtener productos', error);
      return [];
    }
  }

  async getProductById(id) {
    const productById = this.products.find(product => product.id === id);
    console.log('Se realizó una búsqueda por id');

    if (productById) {
      return productById;
    } else {
      throw new Error('El producto con ese Id no existe');
    }
  }

  async updateProduct(id, updatedProduct) {
    let productFound = false;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        this.products[i] = { ...this.products[i], ...updatedProduct };
        productFound = true;
        break;
      }
    }

    if (productFound) {
      try {
        await this.saveProducts();
        console.log(`El producto con el Id = ${id} fue actualizado`);
      } catch (error) {
        console.error('Error al actualizar producto:', error);
      }
    } else {
      throw new error('El producto con ese Id no existe', error);
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

export default productManager;


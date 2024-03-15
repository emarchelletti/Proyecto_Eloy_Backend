import mongoose from 'mongoose'
import * as Products from "../src/dao/services/products.service.js";
import * as chai from 'chai';
import dotenv from "dotenv";

dotenv.config('.env');

mongoose.connect(process.env.MONGO_URL_TEST)

const expect = chai.expect;

describe('Testear DAO de products con CHAI', () => {
    let productsDao
  before(function () {
    productsDao = Products;
  })

  beforeEach(async function () {
    this.timeout(10000)
    await mongoose.connection.collections.products.deleteMany({})
  })

  const mockProduct = {
    title: 'Raqueta Wilson',
    price: 200,
    stock: 10,
    category: 'Raquetas'
  }

  it('El DAO debe poder obtener los productos en formato de arreglo', async function () {
    const result = await productsDao.getAllProducts({
        limit: 10,
        page: 1,
        sort: undefined, 
        query: undefined, 
        available: undefined, 
      });

    expect(result.payload).to.be.an('array')
  })

  it('El DAO debe agregar un producto correctamente a la base de datos', async function () {
    const result = await productsDao.createProduct(mockProduct)

    expect(result).to.have.property('_id')
  })

  it('El DAO debe poder actualizar un producto existente', async function () {
    const createdProduct = await productsDao.createProduct(mockProduct);
    const updatedData = { ...mockProduct, price: 300 };
    const updatedProduct = await productsDao.updateProduct(createdProduct._id, updatedData);
    expect(updatedProduct.price).to.equal(300);
  })

  it('El DAO debe poder eliminar un producto existente', async function () {
    const createdProduct = await productsDao.createProduct(mockProduct);
    await productsDao.deleteProduct(createdProduct._id);
    const deletedProduct = await productsDao.getProductById(createdProduct._id);
    expect(deletedProduct).to.be.null;
  })
})

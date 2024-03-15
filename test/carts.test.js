import supertest from 'supertest';
import app from '../src/app'; 
import chai from 'chai';

const expect = chai.expect;
const request = supertest(app);

describe('Carts Router', () => {
  it('should get the user cart', async () => {
    const response = await request.get('/api/carts');

    expect(response.status).to.equal(200);
  });

  it('should add a product to the cart', async () => {
    const response = await request.post('/api/carts/add').send({
      productId: 'product_id_here',
      quantity: 1
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Product added to cart successfully');
  });

});

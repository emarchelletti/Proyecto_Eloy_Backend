import supertest from 'supertest';
import app from '../src/app';
import chai from 'chai';

const expect = chai.expect;
const request = supertest(app);

describe('Sessions Router', () => {
  it('should log in a user', async () => {
    const response = await request.post('/api/sessions/login').send({
      email: 'test@example.com',
      password: 'testpassword'
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should log out a user', async () => {
    const response = await request.post('/api/sessions/logout');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Sesión cerrada exitosamente');
  });

});

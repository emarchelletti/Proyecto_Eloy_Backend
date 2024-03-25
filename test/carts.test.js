import supertest from "supertest";
import * as chai from "chai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cartService from "../src/dao/services/carts.service.js";

dotenv.config(".env");

mongoose.connect(process.env.MONGO_URL_TEST);

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Carts Router", () => {
  let cartId;

  before(async () => {
    // Obtener todos los carritos
    const response = await request.get("/api/carts");
    const cart = response.body.find((cart) => cart.user === "mockUser");
    cartId = cart._id;
  });

  it("Creación de carrito", async () => {
    const response = await request
      .post("/api/carts")
      .send({ userId: "mockUser" });

    // Verificar el estado de la respuesta
    expect(response.status).to.equal(201);

    // Verificar si el cuerpo de la respuesta contiene la información del carrito creado
    expect(response.body).to.have.property("_id");
  });

  it("Agregar producto al carrito", async () => {
    const productId = "6600ca23c3d0c17715a31b83"; // Id del producto de prueba cargado en la db
    const response = await request.post(
      `/api/carts/${cartId}/products/${productId}`
    );
    // Verificar el estado de la respuesta
    expect(response.status).to.equal(200);

    //Verificar si el producto se agregó correctamente al carrito
    const updatedCart = await cartService.getCartById(cartId);
    expect(updatedCart.products).to.be.an("array");
    expect(updatedCart.products).to.have.lengthOf.at.least(1);
  });
});

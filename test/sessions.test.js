import supertest from "supertest";
import * as chai from "chai";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Sessions Router", () => {
  let cookie;

  it("Logueo de usuario", async () => {
    let mockUser = { email: "eloymarchelletti@gmail.com", password: "123" };
    const response = await request
      .post("/api/sessions/login")
      .send(mockUser)
      .redirects(1);

    // Verificar el estado de la respuesta
    expect(response.status).to.equal(200);

    // Verificar la URL de redirección
    expect(response.redirects.length).to.equal(1);
    expect(response.redirects[0]).to.equal("http://localhost:8080/profile");
  });

  it("Cerrar sesion de usuario", async () => {
    const response = await request.post("/api/sessions/logout");
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('"Sesión cerrada exitosamente"');
  });

  it("Debe devolver la sesion activa", async () => {
    const response = await request.get("/api/sessions");
    expect(response).to.be.ok;
  });
});

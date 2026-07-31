// Teste da rota de produtos usando Jest + Supertest
// Products route test using Jest + Supertest

import request from "supertest";
import app from "../src/app.js"; // ajuste o caminho se necessário

describe("GET /products", () => {

  // Verifica se a rota retorna status 200 e a mensagem correta
  // Checks if the route returns status 200 and the correct message
  test("deve retornar status 200 e mensagem de funcionamento", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "rota de produtos funcionando");
  });

});

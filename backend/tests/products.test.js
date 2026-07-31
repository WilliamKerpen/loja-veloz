//  Teste da rota de produtos usando TAP + Supertest
// Products route test using TAP + Supertest

import t from "tap";
import request from "supertest";
import app from "../src/app.js";

t.test("GET /products deve retornar status 200 e mensagem", async t => {
  const res = await request(app).get("/products");

  t.equal(res.statusCode, 200);
  t.same(res.body, { message: "rota de produtos funcionando" });

  t.end();
});

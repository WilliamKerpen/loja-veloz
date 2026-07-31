//  Teste da rota de produtos usando Node Test Runner
//  Products route test using Node Test Runner

import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import server from "../src/server.js"; 

test("GET /products deve retornar status 200 e mensagem", async () => {
  const res = await request(server).get("/products");

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { message: "rota de produtos funcionando" });
});

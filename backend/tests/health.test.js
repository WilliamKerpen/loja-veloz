//  Teste da rota de health usando Node Test Runner
// Health route test using Node Test Runner

import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import server from "../src/server.js"; // AGORA ESTÁ CORRETO

test("GET /health deve retornar status ok", async () => {
  const res = await request(server).get("/health");

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { status: "ok" });
});

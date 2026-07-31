//  Teste da rota de health
// Health route test

import t from "tap";
import request from "supertest";
import app from "../src/app.js";

t.test("GET /health deve retornar status ok", async t => {
  const res = await request(app).get("/health");

  t.equal(res.statusCode, 200);
  t.same(res.body, { status: "ok" });

  t.end();
});

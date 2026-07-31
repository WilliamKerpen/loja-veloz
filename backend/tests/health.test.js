import request from "supertest";
import app from "../src/app.js"; // ajuste o caminho conforme seu projeto

describe("Health Check", () => {
  test("API deve responder com status 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

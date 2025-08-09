import request from "supertest";
import app from "../app";

describe("Auth Routes", () => {
  it("GET / should return ok", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});

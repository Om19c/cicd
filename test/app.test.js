const request = require("supertest");
const app = require("../src/app");

describe("web app", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
  it("GET / returns HTML", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("CI/CD demo");
  });
  it("GET /api/info returns version", async () => {
    const res = await request(app).get("/api/info");
    expect(res.body).toHaveProperty("version");
  });
});

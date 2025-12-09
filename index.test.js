const request = require("supertest");
const app = require("./index");

describe("Express app", () => {
  describe("GET /", () => {
    it('should return "Hello World!"', async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello World!");
    });
  });

  describe("GET /crash", () => {
    let originalExit;

    beforeAll(() => {
      // mock process.exit so Jest process doesn't actually exit
      originalExit = process.exit;
      process.exit = jest.fn();
    });

    afterAll(() => {
      process.exit = originalExit;
    });

    it("should respond and call process.exit(1)", async () => {
      const res = await request(app).get("/crash");

      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("App is crashing...");
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });

  describe("GET /:id", () => {
    it("should return the id in the response", async () => {
      const res = await request(app).get("/aman");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world  aman");
    });

    it("should handle another id value", async () => {
      const res = await request(app).get("/123");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world  123");
    });
  });
});

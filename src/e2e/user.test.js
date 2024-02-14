import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../createApp.mjs";

describe("create user and login", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost/express_tutorial_test")
      .then(() => console.log("Connected to Test Database"))
      .catch((err) => console.log(`Error: ${err}`));

    app = createApp();
  });

  it("should create the user", async () => {
    const response = await request(app).post("/api/users").send({
        username: "adam123",
        password: "password",
        displayName: "Adam The Developer",
    });
    expect(response.statusCode).toBe(201);
});

  it("should log the user in", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({ username: "adam123", password: "password" });
      expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
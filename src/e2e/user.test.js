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
			username: "Kratos",
			password: "password",
			displayName: "Kratos God of War",
		});
		expect(response.statusCode).toBe(201);
	});

	it("should log the user in and visit /api/auth/status and return auth user", async () => {
		const response = await request(app)
			.post("/api/auth")
			.send({ username: "Kratos", password: "password" })
			.then((res) => {
				return request(app)
					.get("/api/auth/status")
					.set("Cookie", res.headers["set-cookie"]);
			});
		expect(response.statusCode).toBe(200);
		expect(response.body.username).toBe("Kratos");
		expect(response.body.displayName).toBe("Kratos God of War");
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});
});

import { Router } from "express";
import { checkSchema } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.get("/api/users", async (request, response) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
});

router.get("/api/users/:id", resolveIndexByUserId, getUserByIdHandler);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  createUserHandler
);

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  console.log(findUserIndex);
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;

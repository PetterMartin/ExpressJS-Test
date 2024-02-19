import { Router } from "express";
import { checkSchema } from "express-validator";
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

router.get("/api/users/:id", resolveIndexByUserId, async (request, response) => {
  const { id } = request.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).send({ msg: "User not found" });
    }

    response.json(user);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  createUserHandler
);

router.put("/api/users/:id", resolveIndexByUserId, async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedUser) {
      return response.status(404).send({ msg: "User not found" });
    }

    response.json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});

router.patch("/api/users/:id", resolveIndexByUserId, async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedUser) {
      return response.status(404).send({ msg: "User not found" });
    }

    response.json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/api/users/:id", resolveIndexByUserId, async (request, response) => {
  const { id } = request.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return response.status(404).send({ msg: "User not found" });
    }

    response.send({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});


export default router;

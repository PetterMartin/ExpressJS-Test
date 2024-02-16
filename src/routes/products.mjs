import { Router } from "express";
import { check } from "express-validator";
import { createProductHandler } from "../handlers/products.mjs";
import { Product } from "../mongoose/schemas/products.mjs";

const router = Router();

router.get("/api/products", async (request, response) => {
	try {
	  const products = await Product.find();
	  response.json(products);
	} catch (error) {
	  console.error(error);
	  response.status(500).send("Internal Server Error");
	}
  });

// POST /api/products
router.post(
    "/api/products",
    [
        check("title").notEmpty().withMessage("Title is required"),
        check("description").notEmpty().withMessage("Description is required"),
    ],
    createProductHandler
);

export default router;

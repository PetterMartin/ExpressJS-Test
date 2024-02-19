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

router.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({ msg: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.patch("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
      const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { title, description },
          { new: true }
      );

      if (!updatedProduct) {
          return res.status(404).send({ msg: "Product not found" });
      }

      res.json(updatedProduct);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
  }
});


router.delete("/api/products/:id", async (req, res) => {
	const { id } = req.params;
   
	try {
	  const deletedProduct = await Product.findByIdAndDelete(id);
   
	  if (!deletedProduct) {
		return res.status(404).send({ msg: "Product not found" });
	  }
   
	  res.send({ msg: "Product deleted successfully" });
	} catch (error) {
	  res.status(500).send({ error: "Internal Server Error" });
	}
  });

export default router;

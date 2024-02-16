import { validationResult } from "express-validator";
import { Product } from "../mongoose/schemas/products.mjs";

export const createProductHandler = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
        const product = new Product({ title, description });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
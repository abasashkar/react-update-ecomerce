const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");

// List all products
router.get("/products", getProducts);

// Get single product
router.get("/products/:id", getProductById);

// Create product (admin)
router.post("/products", createProduct);

module.exports = router;


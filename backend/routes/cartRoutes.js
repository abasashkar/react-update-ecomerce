const express = require("express");

const router = express.Router();

const { getCartByUser, saveCart } = require("../controllers/cartController");

// Get cart for a user
router.get("/cart/:userId", getCartByUser);

// Save/replace cart for a user
router.post("/cart", saveCart);

module.exports = router;


const express = require("express");

const router = express.Router();

const { createOrder } = require("../controllers/orderController");

// Create a new order
router.post("/orders", createOrder);

module.exports = router;


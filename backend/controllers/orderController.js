const Order = require("../models/Order");
const Cart = require("../models/Cart");

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;

    if (!userId || !shippingAddress || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "userId, shippingAddress and at least one item are required",
      });
    }

    const order = new Order({
      userId: String(userId),
      items: items.map((item) => ({
        productId: String(item.id || item.productId || ""),
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl || item.image || "",
        qty: item.qty || 1,
      })),
      shippingAddress,
      totalAmount,
    });

    await order.save();

    // Clear cart for this user after successful order
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || "Unknown error",
    });
  }
};

module.exports = {
  createOrder,
};


const Cart = require("../models/Cart");

// GET /api/cart/:userId
const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    res.json({
      success: true,
      items: cart ? cart.items : [],
    });
  } catch (error) {
    console.error("Error fetching cart", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /api/cart
// Expects { userId, items: [...] }
const saveCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const normalizedItems = Array.isArray(items)
      ? items.map((item) => ({
          productId: String(item.id || item.productId || ""),
          title: item.title,
          price: item.price,
          imageUrl: item.image || item.imageUrl || "",
          qty: item.qty || 1,
        }))
      : [];

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: normalizedItems },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Cart saved successfully",
      cart,
    });
  } catch (error) {
    console.error("Error saving cart", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getCartByUser,
  saveCart,
};


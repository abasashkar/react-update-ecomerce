const Product = require("../models/Product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, description, category, adminId } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: "Title and price are required",
      });
    }

    const product = new Product({
      title,
      price,
      imageUrl: imageUrl || "",
      description: description || "",
      category: category || "general",
      createdBy: adminId ? String(adminId) : undefined,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};


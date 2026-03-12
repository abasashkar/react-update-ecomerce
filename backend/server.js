const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});

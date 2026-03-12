import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Simple protection: redirect if not logged in as admin
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminLogin");
    if (!isAdminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      alert("Please fill in title and price");
      return;
    }

    try {
      setLoading(true);

      const admin = JSON.parse(localStorage.getItem("admin") || "null");

      const res = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          imageUrl,
          category,
          adminId: admin?._id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product added successfully");
        setTitle("");
        setPrice("");
        setImageUrl("");
        setCategory("");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Server error while adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Admin Dashboard</h2>

      <form onSubmit={handleAddProduct} className="card p-3">
        <h5 className="mb-3">Add New Product</h5>

        <input
          className="form-control my-2"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="form-control my-2"
          placeholder="Price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="form-control my-2"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <select
          className="form-select my-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <div className="d-flex align-items-center mt-3">
          <button className="btn btn-success me-2" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </button>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;

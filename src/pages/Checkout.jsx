import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { setCart } from "../redux/action";

const Checkout = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const { subtotal, shipping, total } = useMemo(() => {
    let subtotalCalc = 0;
    cartItems.forEach((item) => {
      subtotalCalc += item.price * item.qty;
    });
    const shippingCalc = cartItems.length > 0 ? 30 : 0;
    return {
      subtotal: subtotalCalc,
      shipping: shippingCalc,
      total: subtotalCalc + shippingCalc,
    };
  }, [cartItems]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter a shipping address");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacing(true);
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        alert("Please login to place an order");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          items: cartItems,
          shippingAddress: address,
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to place order");
        return;
      }

      // Clear cart in Redux
      dispatch(setCart([]));

      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Server error while placing order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-4 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />

        <div className="row">
          <div className="col-md-7">
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Shipping Details</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handlePlaceOrder}>
                  <div className="mb-3">
                    <label className="form-label">Shipping Address</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Flat, Street, City, Pincode"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={placing}
                  >
                    {placing ? "Placing Order..." : "Place Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between border-0 px-0 pb-0">
                    Products ({cartItems.reduce((sum, i) => sum + i.qty, 0)})
                    <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between px-0">
                    Shipping
                    <span>${shipping}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between border-0 px-0 mb-3">
                    <strong>Total</strong>
                    <span>
                      <strong>${Math.round(total)}</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;


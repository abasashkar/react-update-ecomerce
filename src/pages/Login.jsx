import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/action";

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const dispatch = useDispatch();

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const res = await fetch("http://localhost:5001/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if(data.success){
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userLogin","true");

      try {
        // Load cart from server for this user
        const cartRes = await fetch(
          `http://localhost:5001/api/cart/${data.user._id}`
        );
        const cartJson = await cartRes.json();
        if (cartJson.success) {
          dispatch(setCart(cartJson.items || []));
        }
      } catch (error) {
        console.error("Failed to load cart", error);
      }

      alert("Login Successful");
    } else {
      alert(data.message || "Login failed");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />

        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">

            <form onSubmit={handleSubmit}>

              <div className="my-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>

              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <button className="btn btn-dark">
                  Login
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
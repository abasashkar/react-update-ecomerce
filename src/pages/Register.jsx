import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const Register = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{

      const res = await fetch("http://localhost:5001/api/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const data = await res.json()

      if(data.success){
        alert("Registration Successful")

        // clear form
        setName("")
        setEmail("")
        setPassword("")
      }
      else{
        alert(data.message || "User already exists")
      }

    }catch(error){
      console.log(error)
      alert("Server not running")
    }

  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />

        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">

            <form onSubmit={handleSubmit}>

              <div className="my-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </div>

              <div className="my-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
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
                  required
                />
              </div>

              <div className="my-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>

              <div className="text-center">
                <button className="btn btn-dark">
                  Register
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

export default Register;
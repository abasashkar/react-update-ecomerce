import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e)=>{
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/admin/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if(data.success){
      alert("Admin Registered Successfully");
      navigate("/admin-login");
    }
    else{
      alert(data.message);
    }
  };

  return(
    <div className="container">

      <h2>Admin Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Admin Name"
          className="form-control my-3"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Admin Email"
          className="form-control my-3"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control my-3"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn btn-dark">
          Register
        </button>

      </form>

    </div>
  );
};

export default AdminRegister;
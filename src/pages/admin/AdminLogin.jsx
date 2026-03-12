import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

const AdminLogin = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.success && data.role === "admin"){
      localStorage.setItem("adminLogin","true");
      localStorage.setItem("admin", JSON.stringify(data.user));
      navigate("/admin-dashboard");
    }else{
      alert(data.message);
    }
  };

  return(
    <div className="container">

      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>

        <input
        type="email"
        placeholder="Email"
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
          Login
        </button>

      </form>

      <p className="mt-3">Don't have an admin account?</p>

      <button 
        className="btn btn-outline-dark"
        onClick={()=>navigate("/admin-register")}
      >
        Register
      </button>

    </div>
  );
};

export default AdminLogin;
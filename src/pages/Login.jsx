import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if(email === "" || password === "" || (isRegister && name === "")){
      setError("Please fill in all inputs.");
      return;
    }

    try {
      if (isRegister) {
        await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role });
        setIsRegister(false);
        setError("Registration successful! Please login.");
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        const userRole = res.data.user.role;
        if (userRole === "teacher") navigate("/teacher-dashboard");
        else if (userRole === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Invalid Credentials.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{textAlign:"center", width: "350px", padding:"20px", boxShadow:"0 0 10px gray", borderRadius:"8px"}}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <p style={{color: error.includes("successful") ? "green" : "red"}}>{error}</p>}
        {isRegister && (
          <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px", boxSizing:"border-box"}} />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"10px", boxSizing:"border-box"}} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"15px", boxSizing:"border-box"}} />
        {isRegister && (
          <select value={role} onChange={(e)=>setRole(e.target.value)} style={{width:"100%", padding:"10px", marginBottom:"15px"}}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button onClick={handleSubmit} style={{width:"100%", padding:"10px", backgroundColor:"#0077ff", color:"white", border:"none", borderRadius:"5px", marginBottom:"10px"}}>
          {isRegister ? "Register" : "Login"}
        </button>
        <p style={{cursor: "pointer", color: "blue", margin: 0}} onClick={() => { setIsRegister(!isRegister); setError(""); }}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}

export default Login;
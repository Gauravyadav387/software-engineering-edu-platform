import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(email === "" || password === ""){
      alert("Enter email and password");
      return;
    }

    localStorage.setItem("token", "demo");
    navigate("/dashboard");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>

      <div style={{textAlign:"center"}}>

        <h2>Student Login</h2>

        <div style={{
          width:"300px",
          padding:"20px",
          boxShadow:"0 0 10px gray",
          borderRadius:"8px"
        }}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"10px",
              boxSizing:"border-box"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px",
              boxSizing:"border-box"
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width:"100%",
              padding:"10px",
              backgroundColor:"#0077ff",
              color:"white",
              border:"none",
              borderRadius:"5px"
            }}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;
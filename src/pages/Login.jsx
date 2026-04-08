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
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    
    if(trimmedEmail === "" || password === "" || (isRegister && trimmedName === "")){
      setError("Please fill in all inputs.");
      return;
    }

    try {
      if (isRegister) {
        await axios.post("http://localhost:5000/api/auth/register", { name: trimmedName, email: trimmedEmail, password, role });
        setIsRegister(false);
        setError("Registration successful! Please login.");
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email: trimmedEmail, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        const userRole = res.data.user.role;
        if (userRole === "teacher") navigate("/teacher/dashboard");
        else if (userRole === "admin") navigate("/admin");
        else navigate("/dashboard");
      }
    } catch (err) {
      if (!err.response) {
        setError("Network error: Could not connect to Backend Server (Port 5000). Ensure it is running!");
      } else {
        setError(err.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">{isRegister ? "Register" : "Login"}</h2>
        
        {error && (
          <p className={`mb-4 font-semibold ${error.includes("successful") ? "text-green-600" : "text-red-500"}`}>
            {error}
          </p>
        )}

        {isRegister && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isRegister && (
          <select 
            value={role} 
            onChange={(e)=>setRole(e.target.value)} 
            className="w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button 
          onClick={handleSubmit} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mb-4 shadow"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p 
          className="text-blue-500 cursor-pointer hover:underline font-medium" 
          onClick={() => { setIsRegister(!isRegister); setError(""); }}
        >
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}

export default Login;
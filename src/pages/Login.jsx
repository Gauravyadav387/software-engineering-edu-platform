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
  const [emailError, setEmailError] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async () => {
    setError("");
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    
    if (isForgotPassword) {
      if (!otpSent) {
        if (trimmedEmail === "") {
          setError("Please enter your email to receive an OTP.");
          return;
        }
      } else {
        if (otp === "" || password === "") {
          setError("Please enter the OTP and a new password.");
          return;
        }
      }
    } else if(trimmedEmail === "" || password === "" || (isRegister && trimmedName === "")){
      setError("Please fill in all inputs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setEmailError(true);
      return;
    }
    setEmailError(false);

    try {
      if (isForgotPassword) {
        if (!otpSent) {
          const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email: trimmedEmail });
          setOtpSent(true);
          setError(res.data?.message || "OTP Sent! Please check your email.");
        } else {
          await axios.post("http://localhost:5000/api/auth/reset-password", { email: trimmedEmail, otp, newPassword: password });
          setIsForgotPassword(false);
          setOtpSent(false);
          setOtp("");
          setPassword("");
          setError("Password reset successful! Please login.");
        }
      } else if (isRegister) {
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
        <div className="mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 tracking-tight">
            EduBridge
          </h1>
          <p className="text-gray-500 font-medium text-sm">Empowering Your Learning Journey</p>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isForgotPassword ? (otpSent ? "Enter OTP & New Password" : "Reset Password") : isRegister ? "Create an Account" : "Welcome"}
        </h2>
        
        {error && (
          <p className={`mb-4 font-semibold ${error.includes("successful") ? "text-green-600" : "text-red-500"}`}>
            {error}
          </p>
        )}

        {!isForgotPassword && isRegister && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        
        {!isForgotPassword || !otpSent ? (
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e)=>{ setEmail(e.target.value); setEmailError(false); }} 
            className={`w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 ${emailError ? "border-red-500 ring-1 ring-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
          />
        ) : (
          <input 
            type="email" 
            value={email}
            disabled
            className="w-full border p-3 rounded mb-4 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        )}

        {isForgotPassword && otpSent && (
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP"
            value={otp} 
            onChange={(e)=>setOtp(e.target.value)} 
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center font-semibold"
          />
        )}

        {(!isForgotPassword || otpSent) && (
          <input 
            type="password" 
            placeholder={isForgotPassword ? "New Password" : "Password"}
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {!isForgotPassword && isRegister && (
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
          {isForgotPassword ? (otpSent ? "Verify & Reset Password" : "Send OTP") : isRegister ? "Register" : "Login"}
        </button>

        {!isForgotPassword && !isRegister && (
          <p 
            className="text-red-500 cursor-pointer hover:underline font-medium mb-3 text-sm" 
            onClick={() => { setIsForgotPassword(true); setError(""); setOtpSent(false); setOtp(""); }}
          >
            Forgot Password?
          </p>
        )}

        <p 
          className="text-blue-500 cursor-pointer hover:underline font-medium text-sm" 
          onClick={() => { setIsRegister(!isRegister); setIsForgotPassword(false); setError(""); setOtpSent(false); setOtp(""); }}
        >
          {isForgotPassword || isRegister ? "Back to Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}

export default Login;
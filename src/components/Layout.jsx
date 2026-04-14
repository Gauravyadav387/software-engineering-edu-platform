import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide the navbar on the Login page and any other unauthenticated pages
  const isLoginPage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleLogoClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    
    if (user.role === "teacher") navigate("/teacher/dashboard");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isLoginPage && (
        <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={handleLogoClick}
          >
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
              EduBridge
            </h1>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-5 py-2 rounded-lg border border-red-200 transition-colors duration-200 shadow-sm"
          >
            Logout
          </button>
        </nav>
      )}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

export default Layout;

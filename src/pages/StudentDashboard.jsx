import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard(){
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return(
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
      <button 
        onClick={handleLogout} 
        className="absolute top-5 right-5 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition shadow"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold mb-10 text-gray-800">Student Dashboard</h1>

      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg mt-8 text-center">
        <p className="text-gray-600 mb-6 font-medium">Ready to continue learning?</p>
        <button 
          onClick={()=>navigate("/subjects")} 
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Browse Subjects
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
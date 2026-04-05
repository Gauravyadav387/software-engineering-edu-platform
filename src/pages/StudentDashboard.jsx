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
    <div style={{textAlign:"center", marginTop:"80px"}}>
      <button 
        onClick={handleLogout} 
        style={{position: "absolute", top: "20px", right: "20px", padding: "10px 15px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}
      >
        Logout
      </button>

      <h1>Student Dashboard</h1>

      <div style={{width:"300px", margin:"auto", padding:"20px", boxShadow:"0 0 10px gray"}}>
        <button onClick={()=>navigate("/subjects")} style={{padding:"10px", width:"100%"}}>
          Browse Subjects
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
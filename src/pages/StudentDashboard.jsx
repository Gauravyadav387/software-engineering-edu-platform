import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard(){

const navigate = useNavigate();

return(

<div style={{textAlign:"center", marginTop:"80px"}}>

<h1>Student Dashboard</h1>

<div style={{
width:"300px",
margin:"auto",
padding:"20px",
boxShadow:"0 0 10px gray"
}}>

<button
onClick={()=>navigate("/subjects")}
style={{padding:"10px", width:"100%"}}
>
Browse Subjects
</button>

</div>

</div>

);

}

export default StudentDashboard;
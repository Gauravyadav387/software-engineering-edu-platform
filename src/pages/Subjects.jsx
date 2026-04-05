import React, { useState } from "react";
import { Link } from "react-router-dom";

function Subjects(){

const [search, setSearch] = useState("");

const subjects = [
  {id:1,name:"Mathematics"},
  {id:2,name:"Physics"},
  {id:3,name:"Computer Science"}
];

// filter logic
const filteredSubjects = subjects.filter(subject =>
  subject.name.toLowerCase().includes(search.toLowerCase())
);

return(

<div style={{textAlign:"center", marginTop:"50px"}}>

<h2>Select Subject</h2>

{/* 🔍 Search Bar */}
<input
  placeholder="Search subject..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  style={{
    padding:"10px",
    width:"300px",
    marginBottom:"20px"
  }}
/>

{/* Subject List */}
{filteredSubjects.map(subject => (

<div key={subject.id} style={{
  width:"300px",
  margin:"10px auto",
  padding:"15px",
  boxShadow:"0 0 10px gray"
}}>

<Link to={`/videos/${subject.name}`}>
  {subject.name}
</Link>

</div>

))}

</div>

);

}

export default Subjects;
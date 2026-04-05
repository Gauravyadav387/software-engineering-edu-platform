import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

function VideoList(){

const { subject } = useParams();

const [search,setSearch] = useState("");

const videos = [
{id:1,title:"Lecture 1"},
{id:2,title:"Lecture 2"},
{id:3,title:"Lecture 3"}
];

const filteredVideos = videos.filter(video =>
video.title.toLowerCase().includes(search.toLowerCase())
);

return(

<div style={{textAlign:"center", marginTop:"40px"}}>

<h2>{subject} Videos</h2>

<input
placeholder="Search video..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{padding:"10px", width:"300px"}}
/>

{filteredVideos.map(video => (

<div key={video.id} style={{
width:"300px",
margin:"10px auto",
padding:"15px",
boxShadow:"0 0 10px gray"
}}>

<Link to={`/player/${video.id}`}>
{video.title}
</Link>

</div>

))}

</div>

);

}

export default VideoList;
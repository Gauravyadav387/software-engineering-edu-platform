import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function VideoPlayer(){

const { id } = useParams();

// simulate view count API call
useEffect(() => {
  console.log("Video viewed:", id);

  // later you will replace with:
  // axios.post("/api/views", { videoId: id });

}, [id]);

return(

<div style={{
  display:"flex",
  justifyContent:"center",
  marginTop:"40px"
}}>

<div style={{
  width:"700px",
  padding:"20px",
  boxShadow:"0 0 10px gray",
  borderRadius:"10px",
  textAlign:"center"
}}>

<h2>🎥 Video Player</h2>

<video width="100%" controls style={{borderRadius:"10px"}}>

<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>

</video>

<p style={{marginTop:"10px"}}>
Playing Video ID: <b>{id}</b>
</p>

</div>

</div>

);

}

export default VideoPlayer;
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VideoPlayer(){
  const { id } = useParams();

  useEffect(() => {
    const recordView = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:5000/api/analytics/view", { videoId: id }, {
          headers: { Authorization: token }
        });
        console.log("Real video view recorded for ID:", id);
      } catch (err) {
        console.error("Failed to record view", err);
      }
    };
    recordView();
  }, [id]);

  return(
    <div style={{display:"flex", justifyContent:"center", marginTop:"40px"}}>
      <div style={{width:"700px", padding:"20px", boxShadow:"0 0 10px gray", borderRadius:"10px", textAlign:"center"}}>
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
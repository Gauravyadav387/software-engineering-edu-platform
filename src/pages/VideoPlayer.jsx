import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VideoPlayer(){
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRecord = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Failed to fetch video", err);
      } finally {
        setLoading(false);
      }

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
    fetchAndRecord();
  }, [id]);

  if (loading) return <div style={{textAlign:"center", marginTop:"40px"}}>Loading Video Player...</div>;
  if (!video) return <div style={{textAlign:"center", marginTop:"40px"}}>Video Not Found.</div>;

  return(
    <div style={{display:"flex", justifyContent:"center", marginTop:"40px"}}>
      <div style={{width:"700px", padding:"20px", boxShadow:"0 0 10px gray", borderRadius:"10px", textAlign:"center"}}>
        <h2>🎥 {video.title}</h2>
        <video width="100%" controls style={{borderRadius:"10px"}}>
          <source src={video.url} type="video/mp4"/>
        </video>
        <p style={{marginTop:"10px"}}>
          Teacher: <b>{video.teacher?.name || "Unknown"}</b> | Playing ID: <b>{video._id}</b>
        </p>
      </div>
    </div>
  );
}

export default VideoPlayer;
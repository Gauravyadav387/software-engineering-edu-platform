import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function VideoList(){
  const { subject } = useParams();
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos?subject=${subject}`);
        
        if (res.data && res.data.length > 0) {
          setVideos(res.data);
        } else {
          // If the database is empty, fallback to the initial demo videos automatically
          setVideos([
            {_id:"1", title:"Lecture 1", teacher: { name: "Dr. Smith" }},
            {_id:"2", title:"Lecture 2", teacher: { name: "Prof. Johnson" }},
            {_id:"3", title:"Advanced Topics", teacher: { name: "Dr. Smith" }}
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch videos from API, using fallback data");
        // Fallback dummy data mapped to our model expectations if backend fails to answer
        setVideos([
          {_id:"1", title:"Lecture 1", teacher: { name: "Dr. Smith" }},
          {_id:"2", title:"Lecture 2", teacher: { name: "Prof. Johnson" }},
          {_id:"3", title:"Advanced Topics", teacher: { name: "Dr. Smith" }}
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [subject]);

  const filteredVideos = videos.filter(video => {
    const titleMatch = video.title?.toLowerCase().includes(search.toLowerCase());
    const teacherMatch = video.teacher?.name?.toLowerCase().includes(search.toLowerCase());
    return titleMatch || teacherMatch;
  });

  if (loading) return <div style={{textAlign:"center", marginTop:"40px"}}>Loading videos...</div>;

  return(
    <div style={{textAlign:"center", marginTop:"40px"}}>
      <h2>{subject} Videos</h2>
      <input
        placeholder="Search by title or teacher name..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{padding:"10px", width:"300px", marginBottom:"20px"}}
      />
      {filteredVideos.map(video => (
        <div key={video._id} style={{width:"300px", margin:"10px auto", padding:"15px", boxShadow:"0 0 10px gray"}}>
          <Link to={`/player/${video._id}`} style={{display: "block", fontWeight: "bold", marginBottom: "5px"}}>
            {video.title}
          </Link>
          <small style={{color: "gray"}}>Teacher: {video.teacher?.name || "Unknown"}</small>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRecord = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Failed to fetch video", err);
      } finally {
        setLoading(false);
      }

      try {
        const token = localStorage.getItem("token");
        await axios.post(`${API_URL}/api/analytics/view`, { videoId: id }, {
          headers: { Authorization: token }
        });
      } catch (err) {
        console.error("Failed to record view", err);
      }
    };
    fetchAndRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-white text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">Preparing your lecture...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Not Found</h2>
        <p className="text-gray-600 mb-8">The video you're looking for might have been moved or deleted.</p>
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header Overlay */}
      <div className="p-4 sm:p-6 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/60 to-transparent">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <span className="mr-2 text-xl">←</span> Exit Theater
        </button>
        <div className="text-right">
          <h1 className="text-lg font-bold truncate max-w-xs sm:max-w-md">{video.title}</h1>
          <p className="text-xs text-gray-400">Instructor: {video.teacher?.name || "Unknown"}</p>
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-grow flex items-center justify-center p-4 sm:p-12 relative">
        <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black">
          <video 
            className="w-full h-full" 
            controls 
            autoPlay
            controlsList="nodownload"
            poster="/video-placeholder.png"
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="p-8 bg-gray-900 text-white border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full border border-white/5">
                🏷️ {video.subject || "General"}
              </span>
              <span className="flex items-center">
                👤 {video.teacher?.name || "Verified Instructor"}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition">
              Share Lesson
            </button>
            <button className="flex-1 sm:flex-none bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-bold transition border border-white/5">
              Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
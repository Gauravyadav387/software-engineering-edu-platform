import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const TeacherDashboard = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/videos`);
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
  const subjects = [...new Set(videos.map((v) => v.subject))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center">
      <div className="w-full max-w-6xl p-10 relative">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Teacher Dashboard
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => navigate("/teacher/upload")} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Upload Video</button>
          <button onClick={() => navigate("/teacher/manage")} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Manage Videos</button>
          <button onClick={() => navigate("/teacher/analytics")} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Analytics</button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
            <p className="text-gray-500">Total Videos</p>
            <h2 className="text-4xl font-bold mt-2">{totalVideos}</h2>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
            <p className="text-gray-500">Total Views</p>
            <h2 className="text-4xl font-bold mt-2">{totalViews}</h2>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition text-center">
            <p className="text-gray-500">Subjects</p>
            <h2 className="text-4xl font-bold mt-2">{subjects.length}</h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;

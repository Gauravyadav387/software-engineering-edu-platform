import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ManageVideos = () => {
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

  const deleteVideo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/videos/${id}`, {
        headers: { Authorization: token }
      });
      setVideos(videos.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error deleting video", error);
      alert("Error deleting video");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-8 relative">
        <button onClick={() => navigate("/teacher/dashboard")} className="mb-4 text-blue-600 hover:underline">&larr; Back to Dashboard</button>
        <h2 className="text-3xl font-bold mb-6">Manage Videos</h2>

        {videos.length === 0 && (
          <p className="text-gray-500">No videos uploaded yet</p>
        )}

        {videos.map((v) => (
          <div
            key={v._id}
            className="bg-white p-5 mb-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold">{v.title}</p>
              <p className="text-sm text-gray-500">{v.subject}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/player/${v._id}`}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                View
              </Link>

              <button
                onClick={() => deleteVideo(v._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ManageVideos;

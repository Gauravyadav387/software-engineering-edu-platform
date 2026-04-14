import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";



function VideoList() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/videos?subject=${subject}`);
        
        if (res.data && res.data.length > 0) {
          setVideos(res.data);
        } else {
          setVideos([
            { _id: "1", title: "Introduction to " + subject, teacher: { name: "Dr. Smith" } },
            { _id: "2", title: "Advanced " + subject + " Analysis", teacher: { name: "Prof. Johnson" } }
          ]);
        }
      } catch (err) {
        setVideos([
          { _id: "1", title: "Introduction to " + subject, teacher: { name: "Dr. Smith" } },
          { _id: "2", title: "Advanced " + subject + " Analysis", teacher: { name: "Prof. Johnson" } }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
          <p className="text-gray-500 font-medium">Loading {subject} videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate("/subjects")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <span className="mr-2">←</span> Back to Subjects
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{subject} Course Materials</h2>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* 🔍 Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search lectures or teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map(video => (
            <div 
              key={video._id} 
              className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-blue-600 transition-all duration-200"
            >
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Educational content for {subject} module.</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">👤</span>
                  {video.teacher?.name || "Unknown"}
                </div>
                <Link 
                  to={`/player/${video._id}`} 
                  className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No videos found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoList;
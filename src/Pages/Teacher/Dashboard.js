import { useEffect, useState } from "react";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("videos")) || [];
    setVideos(data);
  }, []);

  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const subjects = [...new Set(videos.map((v) => v.subject))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center">
      <div className="w-full max-w-6xl p-10">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Teacher Dashboard
        </h1>

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

export default Dashboard;
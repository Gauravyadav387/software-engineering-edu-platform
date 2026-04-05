import { useEffect, useState } from "react";

const Analytics = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("videos")) || [];
    setVideos(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-8">

        <h2 className="text-3xl font-bold mb-6">Analytics</h2>

        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-white p-5 mb-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <span className="font-medium">{v.title}</span>
            <span className="text-blue-600 font-semibold">
              👁 {v.views}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Analytics;
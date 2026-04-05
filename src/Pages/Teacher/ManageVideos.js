import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("videos")) || [];
    setVideos(data);
  }, []);

  const deleteVideo = (id) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    localStorage.setItem("videos", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-8">

        <h2 className="text-3xl font-bold mb-6">Manage Videos</h2>

        {videos.length === 0 && (
          <p className="text-gray-500">No videos uploaded yet</p>
        )}

        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-white p-5 mb-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold">{v.title}</p>
              <p className="text-sm text-gray-500">{v.subject}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/video/${v.id}`}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                View
              </Link>

              <button
                onClick={() => deleteVideo(v.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
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
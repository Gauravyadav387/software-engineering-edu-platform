import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let videos = JSON.parse(localStorage.getItem("videos")) || [];

    const found = videos.find((v) => String(v.id) === id);
    setVideo(found);

    const updated = videos.map((v) =>
      String(v.id) === id ? { ...v, views: v.views + 1 } : v
    );

    localStorage.setItem("videos", JSON.stringify(updated));
  }, [id]);

  if (!video) return <div className="p-6">Video not found</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      <h2 className="text-2xl font-bold mb-4">{video.title}</h2>

      <video
        src={video.preview}
        controls
        className="w-full max-w-2xl rounded shadow"
      />

    </div>
  );
};

export default VideoPlayer;
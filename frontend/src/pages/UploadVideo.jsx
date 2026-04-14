import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreview(fileUrl);
    }
  };

  const handleUpload = async () => {
    if (!title || !subject || !file) {
      alert("Title, subject and file are required!");
      return;
    }
    
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("video", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/videos/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      alert("Video Uploaded Successfully ✅");
      navigate("/teacher/manage");
    } catch (error) {
      console.error("Upload error", error);
      const serverError = error.response?.data?.error;
      alert(`Upload failed: ${serverError || "Make sure you are logged in as a teacher/admin."}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl px-8 relative mb-6">
        <button onClick={() => navigate("/teacher/dashboard")} className="text-blue-600 hover:underline">&larr; Back to Dashboard</button>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Video</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Video Title"
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter Subject (e.g. Math)"
          className="border p-3 w-full mb-4 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="border p-3 w-full mb-4 rounded h-24"
        />

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        {preview && (
          <video src={preview} controls className="w-full mb-4 rounded bg-black" />
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white w-full py-3 rounded-lg transition font-semibold`}
        >
          {uploading ? "Uploading (Please wait)..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
